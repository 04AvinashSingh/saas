import  sql  from "../configs/db.js";


// ✅ Get all creations by the logged-in user
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await sql`
      SELECT * 
      FROM creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("❌ Error in getUserCreations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all published creations (public feed)
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * 
      FROM creations 
      WHERE publish = true 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("❌ Error in getPublishedCreations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Like / Unlike a creation
export const toggleLikesCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body; // creation id

    // find creation
    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${id}
    `;

    if (!creation) {
      return res.status(404).json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      // unlike
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation unliked";
    } else {
      // like
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation liked";
    }

    // ✅ Convert array into Postgres text[] format: {1,2,3}
    const formattedArray = `{${updatedLikes.join(",")}}`;

    await sql`
      UPDATE creations 
      SET likes = ${formattedArray}::text[] 
      WHERE id = ${id}
    `;

    res.json({ success: true, message });
  } catch (error) {
    console.error("❌ Error in toggleLikesCreations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
