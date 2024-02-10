import { MongoClient } from "mongodb";

(async () => {
  const url = "mongodb://localhost/mean-app";
  const client = new MongoClient(url, {});
  try {
    await client.connect();
    const collection = client.db().collection("categories");
    const categories = [
      { name: "Fashion" },
      { name: "Beauty" },
      { name: "Travel" },
      { name: "LifeStyle" },
      { name: "Personal" },
      { name: "Tech" },
      { name: "Health" },
      { name: "Fitness" },
      { name: "Wellness" },
      { name: "Business" },
      { name: "Education" },
      { name: "Food and Recipe" },
      { name: "Love and Relationships" },
      { name: "Alternative topics" },
      { name: "Green living" },
      { name: "Music" },
      { name: "Automotive" },
      { name: "Marketing" },
      { name: "Internet Services" },
      { name: "Finance" },
      { name: "Sports" },
      { name: "Entertainment" },
      { name: "Productivity" },
      { name: "Hobbies" },
      { name: "Parenting" },
      { name: "Pets" },
      { name: "Photography" },
      { name: "Agriculture" },
      { name: "Art" },
      { name: "DIY" },
      { name: "Science" },
      { name: "Gaming" },
      { name: "History" },
      { name: "Self improvement" },
      { name: "Movies" },
      { name: "Cars" },
    ];
    await collection.deleteMany();
    await collection.insertMany(categories);
    console.log(`${categories.length} categories seeded`);
    process.exit(0);
  } catch (error) {
    console.log(error.stack);
    process.exit(1);
  }
})();
