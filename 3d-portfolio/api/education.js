export default function handler(req, res) {
  res.status(200).json({
    data: [
      {
        institution: "Example University",
        degree: "BSc Computer Science",
        field: "Computer Science",
        startDate: "2018-09-01",
        endDate: "2022-06-30",
        gpa: 3.8,
        description: "Studied software engineering, algorithms, and web development.",
        achievements: ["Dean's List", "Programming Club President"],
        location: "City, Country",
        logo: "",
        isActive: true,
        order: 1
      }
    ]
  });
} 