export default function handler(req, res) {
  res.status(200).json({
    data: [
      { name: "JavaScript", category: "Frontend", proficiency: 90 },
      { name: "Node.js", category: "Backend", proficiency: 85 },
      { name: "React", category: "Frontend", proficiency: 88 },
      { name: "MongoDB", category: "Database", proficiency: 80 }
    ]
  });
} 