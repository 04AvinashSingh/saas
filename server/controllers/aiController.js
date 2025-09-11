import OpenAI from "openai";
import sql from "../configs/db.js";
import FormData from "form-data";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from'fs';
import Pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});




export const generateArticle=async(req,res)=>{
    try {
        const {userId} =req.auth();
        const {prompt,length}=req.body;

        const plan=req.plan;
        const free_usage=req.free_usage ;

        if(plan !=='premium' && free_usage>=10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue"})
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature:0.7,
            max_tokens:length,
        });

        const content=response.choices[0].message.content

        await sql` INSERT INTO creations (user_id,prompt, content, type) 
        VALUES (${userId},${prompt},${content}, 'article')`;

        if(plan !== 'premium' ){
            
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:free_usage+1
                }
            })
        }

        res.json({success: true,content})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}


export const generateBlogTitle=async(req,res)=>{
    try {
        const {userId} =req.auth();
        const {prompt}=req.body;

        const plan=req.plan;
        const free_usage=req.free_usage ;

        if(plan !=='premium' && free_usage>=10){
            return res.json({success: false, message: "Limit reached. Upgrade to continue"})
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature:0.7,
            max_tokens:100,
        });

        const content=response.choices[0].message.content

        await sql` INSERT INTO creations (user_id,prompt, content, type) 
        VALUES (${userId},${prompt},${content}, 'blog-title')`;

        if(plan !== 'premium' ){
            
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:free_usage+1
                }
            })
        }

        res.json({success: true,content})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}

export const generateImage=async(req,res)=>{
    try {
        const {userId} =req.auth();
        const {prompt, publish}=req.body;

        const plan=req.plan;
        

        if(plan !=='premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }

        

        const formData = new FormData()
        formData.append('prompt', prompt) 

        const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1", formData,{
            headers:{'x-api-key':process.env.CLIPDROP_API_KEY,},
            responseType:"arraybuffer"
        })

        const base64Image=`data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;
        const{secure_url} =await cloudinary.uploader.upload(base64Image)

        await sql` INSERT INTO creations (user_id,prompt, content, type,publish) 
        VALUES (${userId},${prompt},${secure_url}, 'image',${publish??false})`;


        res.json({success: true,content:secure_url})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}

export const RemoveImageBackground=async(req,res)=>{
    try {

        

        
        const {userId} =req.auth();
        const image=req.file;

        const plan=req.plan;

        
        

        if(plan !=='premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }
        if (!image) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // Upload buffer using upload_stream
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads",
            transformation: [
              { effect: "background_removal", background_removal: "remove_the_background" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(image.buffer); // send buffer to Cloudinary
      });

    const { secure_url } = await uploadToCloudinary();

    //     if (!req.file) {
    //         return res.status(400).json({ success: false, message: "No file uploaded" });
    //     }

    // const { path } = req.file;

        
    //     const{secure_url} =await cloudinary.uploader.upload(path,{
    //         transformation:[
    //             {
    //                 effect:'background_removal',
    //                 background_removal:'remove_the_background'
    //             }
    //         ]
    //     })



        await sql` INSERT INTO creations (user_id,prompt, content, type) 
        VALUES (${userId},'Remove background from imgae',${secure_url}, 'image')`;


        res.json({success: true,content:secure_url})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}

export const RemoveImageObject=async(req,res)=>{
    try {
        const {userId} =req.auth();
        const {object}=req.body;
        const image=req.file;

        const plan=req.plan;
        

        if(plan !=='premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }


        if (!image) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    // Upload buffer using upload_stream
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(image.buffer);
      });

    const { public_id } = await uploadToCloudinary();

    // Apply object removal effect
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });


        

        

        
        // const{public_id} =await cloudinary.uploader.upload(image.path)

        // const imageUrl=cloudinary.url(public_id,{
        //     transformation:[{effect: `gen_remove:${object}`}],
        //     resource_type:'image'
        // })

        await sql` INSERT INTO creations (user_id,prompt, content, type) 
        VALUES (${userId},${`Remove ${object} from image`},${imageUrl}, 'image')`;


        res.json({success: true,content:imageUrl})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}


export const resumeReview=async(req,res)=>{
    try {
        const {userId} =req.auth();
       
        const resume=req.file;

        const plan=req.plan;
        

        if(plan !=='premium'){
            return res.json({success: false, message: "This feature is only available for premium subscriptions"})
        }

        if (!resume) {
      return res.json({ success: false, message: "No resume uploaded" });
    }
        if(resume.size>5*1024*1024){
            return res.json({success:false, message:"Resume file size exceeds allowed size (5MB)."})
        }

        //const dataBuffer=fs.readFileSync(resume.path)
        const pdfData =await Pdf(resume.buffer);


        const prompt=`Review the following resume and provide constructive feefback
        on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n ${pdfData.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature:0.7,
            max_tokens:1000,
        });

        const content=response.choices[0].message.content

        await sql` INSERT INTO creations (user_id,prompt, content, type) 
        VALUES (${userId},'Review the uploaded resume',${content}, 'resume-review')`;


        res.json({success: true,content})

        

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}