const { hashPassword } = require("../../utils/auth");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // generate a migration for role with name and description

    const password = await hashPassword("!Password123");
    const roleData = [
      {
        id: 1,
        name: "superAdmin",
        description: "superAdmin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "admin",
        description: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "employee",
        description: "employee",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "manager",
        description: "manager",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const roles = await queryInterface.bulkInsert("Role", roleData, {
      returning: ["id"]
    });

    const companyData = [
      {
        id: 1,
        companyName: "Tech Mahindra",
        companyAddress: "Goma",
        companyPhone: "+243066477383",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        companyName: "Code of Africa",
        companyAddress: "Kigali",
        companyPhone: "+2439066477383",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        companyName: "Novatech",
        companyAddress: "Goma, DRC",
        companyPhone: "+1234567890",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        companyName: "Sovetech",
        companyAddress: "South Africa",
        companyPhone: "+9876543210",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        companyName: "Local Traders",
        companyAddress: "Pakistan",
        companyPhone: "+5555555555",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        companyName: "Heri Skills",
        companyAddress: "Goma, DRC",
        companyPhone: "+6666666666",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        companyName: "Andela",
        companyAddress: "Nairobi, Kenya",
        companyPhone: "+7777777777",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        companyName: "Ufundi Tech",
        companyAddress: "Goma, DRC",
        companyPhone: "+8888888888",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        companyName: "Wimbi dira",
        companyAddress: "Goma, DRC",
        companyPhone: "+9999999999",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        companyName: "Tech Expert",
        companyAddress: "Kigali, RWANDA",
        companyPhone: "+1010101010",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const companies = await queryInterface.bulkInsert("Company", companyData, {
      returning: ["id"]
    });

    const departmentData = [
      {
        id: 1,
        departmentName: "Technology",
        departmentManager: "Okolongo",
        departmentDescription: "Technology department",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        departmentName: "Software Development",
        departmentManager: "John Doe",
        departmentDescription: "Software development team",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        departmentName: "IT Support",
        departmentManager: "Alice Smith",
        departmentDescription: "IT support and maintenance",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        departmentName: "Quality Assurance",
        departmentManager: "Mary Johnson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        departmentName: "DevOps",
        departmentManager: "Robert Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Code of Africa Departments
      {
        id: 6,
        departmentName: "Technology",
        departmentManager: "Oliver White",
        departmentDescription: "Technology department",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        departmentName: "Software Development",
        departmentManager: "Emma Clark",
        departmentDescription: "Software development team",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        departmentName: "IT Support",
        departmentManager: "James Davis",
        departmentDescription: "IT support and maintenance",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        departmentName: "Quality Assurance",
        departmentManager: "Sophia Wilson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        departmentName: "DevOps",
        departmentManager: "William Lee",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Novatech Departments
      {
        id: 11,
        departmentName: "Technology",
        departmentManager: "Alex Brown",
        departmentDescription: "Technology department",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        departmentName: "Software Development",
        departmentManager: "Linda White",
        departmentDescription: "Software development team",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        departmentName: "IT Support",
        departmentManager: "Andrew Davis",
        departmentDescription: "IT support and maintenance",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        departmentName: "Quality Assurance",
        departmentManager: "Emily Wilson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        departmentName: "DevOps",
        departmentManager: "Michael Lee",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sovetech Departments
      {
        id: 16,
        departmentName: "Technology",
        departmentManager: "Daniel Smith",
        departmentDescription: "Technology department",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        departmentName: "Software Development",
        departmentManager: "Sophie Davis",
        departmentDescription: "Software development team",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        departmentName: "IT Support",
        departmentManager: "David White",
        departmentDescription: "IT support and maintenance",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        departmentName: "Quality Assurance",
        departmentManager: "Olivia Johnson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        departmentName: "DevOps",
        departmentManager: "Ethan Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Local Traders Departments
      {
        id: 21,
        departmentName: "Technology",
        departmentManager: "Lucas Lee",
        departmentDescription: "Technology department",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        departmentName: "Software Development",
        departmentManager: "Chloe Wilson",
        departmentDescription: "Software development team",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        departmentName: "IT Support",
        departmentManager: "Benjamin Davis",
        departmentDescription: "IT support and maintenance",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        departmentName: "Quality Assurance",
        departmentManager: "Ella Smith",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        departmentName: "DevOps",
        departmentManager: "Logan Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Heri Skills Departments
      {
        id: 26,
        departmentName: "Technology",
        departmentManager: "Liam White",
        departmentDescription: "Technology department",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        departmentName: "Software Development",
        departmentManager: "Mia Davis",
        departmentDescription: "Software development team",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        departmentName: "IT Support",
        departmentManager: "Jackson Smith",
        departmentDescription: "IT support and maintenance",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        departmentName: "Quality Assurance",
        departmentManager: "Emily Wilson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        departmentName: "DevOps",
        departmentManager: "Jack Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Andela Departments
      {
        id: 31,
        departmentName: "Technology",
        departmentManager: "Charlotte Lee",
        departmentDescription: "Technology department",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        departmentName: "Software Development",
        departmentManager: "Sophie Davis",
        departmentDescription: "Software development team",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        departmentName: "IT Support",
        departmentManager: "Daniel White",
        departmentDescription: "IT support and maintenance",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        departmentName: "Quality Assurance",
        departmentManager: "Oliver Johnson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        departmentName: "DevOps",
        departmentManager: "Ethan Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ufundi Tech Departments
      {
        id: 36,
        departmentName: "Technology",
        departmentManager: "Lucas Lee",
        departmentDescription: "Technology department",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        departmentName: "Software Development",
        departmentManager: "Chloe Wilson",
        departmentDescription: "Software development team",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        departmentName: "IT Support",
        departmentManager: "Benjamin Davis",
        departmentDescription: "IT support and maintenance",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        departmentName: "Quality Assurance",
        departmentManager: "Ella Smith",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        departmentName: "DevOps",
        departmentManager: "Logan Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Wimbi Dira Departments
      {
        id: 41,
        departmentName: "Technology",
        departmentManager: "Liam White",
        departmentDescription: "Technology department",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        departmentName: "Software Development",
        departmentManager: "Mia Davis",
        departmentDescription: "Software development team",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        departmentName: "IT Support",
        departmentManager: "Jackson Smith",
        departmentDescription: "IT support and maintenance",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        departmentName: "Quality Assurance",
        departmentManager: "Emily Wilson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        departmentName: "DevOps",
        departmentManager: "Jack Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Tech Expert Departments
      {
        id: 46,
        departmentName: "Technology",
        departmentManager: "Charlotte Lee",
        departmentDescription: "Technology department",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        departmentName: "Software Development",
        departmentManager: "Sophie Davis",
        departmentDescription: "Software development team",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        departmentName: "IT Support",
        departmentManager: "Daniel White",
        departmentDescription: "IT support and maintenance",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        departmentName: "Quality Assurance",
        departmentManager: "Oliver Johnson",
        departmentDescription: "Quality assurance and testing",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        departmentName: "DevOps",
        departmentManager: "Ethan Brown",
        departmentDescription: "DevOps and infrastructure",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const departments = await queryInterface.bulkInsert(
      "Department",
      departmentData,
      {
        returning: ["id"]
      }
    );

    const adminData = [
      {
        id: 1,
        name: "Mwafrika Josue",
        email: "mwafrikajosue@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Élise Dupont",
        email: "admin2@example.com",
        password,
        companyId: companies[1].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Maxime Lefebvre",
        email: "admin3@example.com",
        password,
        companyId: companies[2].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Sophie Martin",
        email: "admin4@example.com",
        password,
        companyId: companies[3].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Pierre Lambert",
        email: "admin5@example.com",
        password,
        companyId: companies[4].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Charlotte Roux",
        email: "admin6@example.com",
        password,
        companyId: companies[5].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Antoine Fournier",
        email: "admin7@example.com",
        password,
        companyId: companies[6].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: "Camille Lemoine",
        email: "admin8@example.com",
        password,
        companyId: companies[7].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: "Émilie Girard",
        email: "admin9@example.com",
        password,
        companyId: companies[8].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: "Mathis Dubois",
        email: "admin10@example.com",
        password,
        companyId: companies[9].id,
        roleId: roles[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

  await queryInterface.bulkInsert("User", adminData, {
      returning: ["id"]
    });

    // Employees

    const employeeData = [
      {
        id: 11,
        name: "Jean Baptiste",
        email: "jeanbaptiste@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: "Marie Uwase",
        email: "marieuwase@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: "Emmanuel Niyonzima",
        email: "emmanuelniyonzima@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: "Ange Mukamana",
        email: "angemukamana@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: "Tharcisse Habimana",
        email: "tharcissehabimana@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: "Sandra Umutoni",
        email: "sandraumutoni@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: "Patrick Ndayisaba",
        email: "patrickndayisaba@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: "Gisele Mutesi",
        email: "giselemutesi@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: "Olivier Gasana",
        email: "oliviergasana@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: "Grace Uwimana",
        email: "graceuwimana@gmail.com",
        password,
        companyId: companies[0].id,
        roleId: roles[3].id,
        departmentId: departments[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const employees = await queryInterface.bulkInsert("User", employeeData, {
      returning: ["id"]
    });

    // shifts
    const shiftData = [
      // Tech Mahindra Shifts
      {
        id: 1,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Code of Africa Shifts
      {
        id: 4,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Novatech Shifts
      {
        id: 7,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sovetech Shifts
      {
        id: 10,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Local Traders Shifts
      {
        id: 13,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Heri Skills Shifts
      {
        id: 16,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Andela Shifts
      {
        id: 19,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Ufundi Tech Shifts
      {
        id: 22,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Wimbi Dira Shifts
      {
        id: 25,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Tech Expert Shifts
      {
        id: 28,
        shiftName: "Morning",
        startTime: "08:00",
        endTime: "12:00",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        shiftName: "Afternoon",
        startTime: "12:00",
        endTime: "16:00",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        shiftName: "Night",
        startTime: "16:00",
        endTime: "20:00",
        companyId: companies[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const shiftIds = await queryInterface.bulkInsert("Shift", shiftData, {
      returning: ["id"]
    });

    const assignedShifts = [];

    employees.forEach((employee, index) => {
      const shiftIndex = index % 3;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + shiftIndex);
      startDate.setHours(8); // Set to 8:00 AM

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 4);

      const assignment = {
        userId: employee.id,
        shiftId: shiftIds[shiftIndex].id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      assignedShifts.push(assignment);
    });

   await queryInterface.bulkInsert(
      "EmployeeShift",
      assignedShifts,
      {
        returning: ["id"]
      }
    );

    const absenceData = [
      {
        id: 1,
        userId: employees[2].id,
        startDate: "2023-11-08",
        endDate: "2023-10-28",
        reason: "Sick",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: employees[2].id,
        startDate: "2023-11-04",
        endDate: "2023-10-22",
        reason: "Party",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: employees[2].id,
        startDate: "2023-11-18",
        endDate: "2023-10-23",
        reason: "Death",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

  await queryInterface.bulkInsert("Absence", absenceData, {
      returning: ["id"]
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Company", null, {});
      await queryInterface.bulkDelete("Role", null, {});
      await queryInterface.bulkDelete("Department", null, {});
      await queryInterface.bulkDelete("User", null, {});
      await queryInterface.bulkDelete("Shift", null, {});
      await queryInterface.bulkDelete("EmployeeShift", null, {});
      await queryInterface.bulkDelete("Absence", null, {});
    } catch (error) {
      console.log(error);
    }
  }
};
