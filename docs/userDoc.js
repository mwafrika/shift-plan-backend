const userApiObject = {};
const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "john@example.com",
      required: true
    },
    password: {
      type: "string",
      example: "123456",
      required: true
    }
  }
};

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John Doe"
    },
    email: {
      type: "string",
      example: "john@example.com",
      required: true
    },
    password: {
      type: "string",
      example: "123456",
      required: true
    },
    companyName: {
      type: "string",
      example: "Company Name"
    },
    companyAddress: {
      type: "string",
      example: "Company Address"
    },
    companyPhone: {
      type: "string",
      example: "Company Phone"
    }
  }
};

const userApiArr = [
  {
    path: "/auth/reset-password/:id/:token",
    respondWith: {
      post: {
        tags: ["Authentication"],
        description: "Reset Password",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "User ID"
          },
          {
            name: "token",
            in: "path",
            type: "string",
            required: true,
            description: "Reset Token"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                    example: "123456",
                    required: true
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Password reset Successfully"
          },
          404: {
            description: "User not found"
          },
          417: {
            description: "Please fill in the required fields"
          },
          500: {
            description: "Internal server error"
          }
        }
      }
    }
  },
  {
    path: "/auth/profile",
    respondWith: {
      get: {
        tags: ["Authentication"],
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true
          }
        ],
        description: "Get Currently Logged in User",
        responses: {
          200: {
            description: "Profile fetched Successfully"
          },
          404: {
            description: "Profile not found"
          }
        }
      }
    }
  },
  {
    path: "/auth/forget-password",
    respondWith: {
      post: {
        tags: ["Authentication"],
        description: "Forget Password",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "mwafrikajosue@gmail.com",
                    required: true
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Email sent Successfully"
          },
          404: {
            description: "Email not found"
          },
          417: {
            description: "Please fill in the required fields"
          },
          500: {
            description: "Internal server error"
          }
        }
      }
    }
  },
  {
    path: "/users",
    respondWith: {
      get: {
        tags: ["User"],
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true
          }
        ],
        description: "Get All Users",
        responses: {
          200: {
            description: "UsersList fetched Successfully"
          },
          404: {
            description: "No Users found"
          }
        }
      }
    }
  },
  // Get users details
  {
    path: "/users/{id}",
    respondWith: {
      get: {
        tags: ["User"],
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "User ID"
          },
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "User's authentication token"
          }
        ],
        description: "Get a User by ID",
        responses: {
          200: {
            description: "User fetched Successfully"
          },
          404: {
            description: "User not found"
          }
        }
      }
    }
  },
  {
    path: "/users/{id}",
    respondWith: {
      delete: {
        tags: ["User"],
        summary: "Delete a User",
        description: "Deletes a user by ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "ID of the user to delete"
          },
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "User's authentication token"
          }
        ],
        responses: {
          204: {
            description: "User deleted successfully"
          },
          404: {
            description: "User not found"
          },
          401: {
            description: "Authentication required"
          },
          403: {
            description: "User is not authorized to perform this action"
          }
        }
      }
    }
  },
  // Approve or deny a company
  {
    path: "/users/{id}/company",
    respondWith: {
      patch: {
        tags: ["Company"],
        summary: "Approve or deny a Company",
        description: "Approves a company for a user by their ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "ID of the user for whom to approve the company"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["approved", "denied", "pending"],
                    description: "Approval status for the company",
                    required: true
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Company approval status updated successfully"
          },
          400: {
            description: "Invalid input data"
          },
          404: {
            description: "User not found"
          }
        }
      }
    }
  },
  {
    path: "/roles",
    respondWith: {
      get: {
        tags: ["Role"],
        summary: "Get All Roles",
        description: "Retrieve a list of all roles by an admin.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          }
        ],
        responses: {
          200: {
            description: "List of roles retrieved successfully"
          },
          403: {
            description: "Access denied (admin privileges required)"
          },
          404: {
            description: "No roles found"
          }
        }
      }
    }
  },
  {
    path: "/auth/register",
    respondWith: {
      post: {
        tags: ["Authentication"],
        description: "Register a User",

        requestBody: {
          content: {
            "application/json": {
              schema: userSchema
            }
          }
        },
        responses: {
          201: {
            description: "Registered User Successfully"
          },
          400: {
            description: "User already registered"
          }
        }
      }
    }
  },
  {
    path: "/roles/{id}",
    respondWith: {
      get: {
        tags: ["Role"],
        summary: "Get Role by ID",
        description: "Retrieve a role by its unique ID.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          },
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Unique ID of the role to retrieve"
          }
        ],
        responses: {
          200: {
            description: "Role retrieved successfully"
          },
          403: {
            description: "Access denied (admin privileges required)"
          },
          404: {
            description: "Role not found"
          }
        }
      }
    }
  },
  {
    path: "/users/{id}",
    respondWith: {
      delete: {
        tags: ["User"],
        summary: "Delete User by ID",
        description: "Delete a user by their unique ID.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          },
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "Unique ID of the user to delete"
          }
        ],
        responses: {
          204: {
            description: "User deleted successfully"
          },
          403: {
            description: "Access denied (admin privileges required)"
          },
          404: {
            description: "User not found"
          }
        }
      }
    }
  },
  {
    path: "/roles",
    respondWith: {
      post: {
        tags: ["Role"],
        summary: "Create a Role",
        description: "Create a new role with the provided details.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Moderator",
                    required: true,
                    description: "Name of the role to create"
                  },
                  description: {
                    type: "string",
                    example: "Moderator role description",
                    description: "Description of the role"
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Role created successfully"
          },
          400: {
            description: "Invalid input"
          },
          403: {
            description: "Access denied (admin privileges required)"
          }
        }
      }
    }
  },
  {
    path: "/users/:id",
    respondWith: {
      patch: {
        tags: ["User"],
        summary: "Update a User",
        description: "Update user details with the provided information.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          },
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "ID of the user to update"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Updated Name",
                    description: "Updated name of the user"
                  },
                  email: {
                    type: "string",
                    example: "updated@example.com",
                    description: "Updated email address"
                  },
                  password: {
                    type: "string",
                    example: "123456",
                    description: "Updated password"
                  },
                  profilePicture: {
                    type: "string",
                    example: "profilePicture",
                    description: "Updated profilePicture"
                  }
                  // Include other fields to update as needed
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "User updated successfully"
          },
          400: {
            description: "Invalid input"
          },
          403: {
            description: "Access denied (admin privileges required)"
          },
          404: {
            description: "User not found"
          }
        }
      }
    }
  },
  {
    path: "/users",
    respondWith: {
      post: {
        tags: ["User"],
        summary: "Create a User",
        description: "Create user details with the provided information.",
        parameters: [
          {
            name: "token",
            in: "header",
            type: "string",
            required: true,
            description: "Admin's authentication token"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Created Name",
                    description: "Created name of the user"
                  },
                  email: {
                    type: "string",
                    example: "created@example.com",
                    description: "Created email address"
                  },
                  password: {
                    type: "string",
                    example: "123456",
                    description: "Created password"
                  },
                  profilePicture: {
                    type: "string",
                    example: "profilePicture",
                    description: "Created profilePicture"
                  }
                  // Include other fields to update as needed
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "User created successfully"
          },
          400: {
            description: "Invalid input"
          },
          403: {
            description: "Access denied (admin privileges required)"
          },
          404: {
            description: "User not found"
          }
        }
      }
    }
  },
  {
    path: "/auth/login",
    respondWith: {
      post: {
        tags: ["Authentication"],
        description:
          "Logs in the User (For Admin credentials, use email : admin@example.com, password : 1234567)",

        requestBody: {
          content: {
            "application/json": {
              schema: loginSchema
            }
          }
        },
        responses: {
          201: {
            description: "Logged in User Successfully"
          },
          404: {
            description: "User Account not found"
          },
          417: {
            description: "Please fill in the required fields"
          }
        }
      }
    }
  }
];

userApiArr.forEach((shift) => {
  const { path, respondWith } = shift;
  const method = Object.keys(respondWith)[0];
  if (!userApiObject[path]) {
    userApiObject[path] = {};
  }
  userApiObject[path][method] = respondWith[method];
});

export default userApiObject;
