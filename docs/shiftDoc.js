const shiftApiObject = {};

const shiftSchema = {
  type: "object",
  properties: {
    employee: {
      type: "string",
      minLength: 3,
      maxLength: 20
    },
    startDate: {
      type: "string",
      format: "date"
    },
    endDate: {
      type: "string",
      format: "date"
    },
    startTime: {
      type: "string",
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$"
    },
    endTime: {
      type: "string",
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$"
    },
    userId: {
      type: "integer",
      minimum: 1
    }
  },
  required: ["startDate", "endDate", "startTime", "endTime"]
};

const shiftApiArr = [
  // Create (POST) a Shift
  {
    path: "/shifts",
    respondWith: {
      post: {
        tags: ["Shifts"],
        summary: "Create a Shift",
        description: "Create a new shift with the provided details.",
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
              schema: shiftSchema
            }
          }
        },
        responses: {
          201: {
            description: "Shift created successfully"
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

  // Read (GET) Shifts
  {
    path: "/shifts",
    respondWith: {
      get: {
        tags: ["Shifts"],
        summary: "Get Shifts",
        description: "Retrieve a list of shifts.",
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
            description: "Shifts retrieved successfully"
          },

          403: {
            description: "Access denied (admin privileges required)"
          }
        }
      }
    }
  },

  // Update (PUT) a Shift
  {
    path: "/shifts/{id}",
    respondWith: {
      patch: {
        tags: ["Shifts"],
        summary: "Update a Shift",
        description: "Update an existing shift with the provided details.",
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
            type: "integer",
            required: true,
            description: "ID of the shift to update"
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: shiftSchema
            }
          }
        },
        responses: {
          200: {
            description: "Shift updated successfully"
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

  // Delete (DELETE) a Shift
  {
    path: "/shifts/{id}",
    respondWith: {
      delete: {
        tags: ["Shifts"],
        summary: "Delete a Shift",
        description: "Delete an existing shift by ID.",
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
            type: "integer",
            required: true,
            description: "ID of the shift to delete"
          }
        ]
      },
      responses: {
        204: {
          description: "Shift deleted successfully"
        },
        404: {
          description: "Shift not found"
        },
        401: {
          description: "Authentication required"
        },
        403: {
          description: "Shift is not authorized to perform this action"
        }
      }
    }
  },
  {
    path: "/shifts/{id}",
    respondWith: {
      get: {
        tags: ["Shifts"],
        summary: "Get Single Shift",
        description: "Retrieve details of a single shift by ID.",
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
            type: "integer",
            required: true,
            description: "ID of the shift to retrieve"
          }
        ],
        responses: {
          200: {
            description: "Shift details retrieved successfully"
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
  }
];

shiftApiArr.forEach((shift) => {
  const { path, respondWith } = shift;
  const method = Object.keys(respondWith)[0];
  if (!shiftApiObject[path]) {
    shiftApiObject[path] = {};
  }
  shiftApiObject[path][method] = respondWith[method];
});

export default shiftApiObject;
