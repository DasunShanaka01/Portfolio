export default function handler(req, res) {
  res.status(200).json({
    data: [
      {
        title: "Full Stack Developer",
        summary: "Experienced in building web applications using React, Node.js, and MongoDB.",
        experience: "5 years"
      }
    ]
  });
} 