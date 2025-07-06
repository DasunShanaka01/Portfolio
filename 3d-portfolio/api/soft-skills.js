export default function handler(req, res) {
  res.status(200).json({
    data: [
      { name: "Communication", category: "Professional", proficiency: 95 },
      { name: "Teamwork", category: "Professional", proficiency: 90 },
      { name: "Problem Solving", category: "Professional", proficiency: 92 }
    ]
  });
} 