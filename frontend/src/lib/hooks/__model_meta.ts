/* eslint-disable */
const metadata = {
    models: {
        user: {
            name: 'User', fields: {
                isNewUser: {
                    name: "isNewUser",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": true }] }],
                }, id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, email: {
                    name: "email",
                    type: "String",
                }, name: {
                    name: "name",
                    type: "String",
                }, mobileNumber: {
                    name: "mobileNumber",
                    type: "String",
                }, idNumber: {
                    name: "idNumber",
                    type: "String",
                }, sex: {
                    name: "sex",
                    type: "UserSex",
                }, birthDate: {
                    name: "birthDate",
                    type: "DateTime",
                }, profileImg: {
                    name: "profileImg",
                    type: "String",
                }, bio: {
                    name: "bio",
                    type: "String",
                }, role: {
                    name: "role",
                    type: "UserRole",
                    attributes: [{ "name": "@default", "args": [] }],
                }, driverVerificationRequest: {
                    name: "driverVerificationRequest",
                    type: "DriverVerificationRequest",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'driver',
                }, ridesAsDriver: {
                    name: "ridesAsDriver",
                    type: "Ride",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'driver',
                }, ridesAsPassenger: {
                    name: "ridesAsPassenger",
                    type: "Ride",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'passengers',
                }, cars: {
                    name: "cars",
                    type: "Car",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'owner',
                }, userReviewsByMe: {
                    name: "userReviewsByMe",
                    type: "UserReview",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'author',
                }, userReviewsAboutMe: {
                    name: "userReviewsAboutMe",
                    type: "UserReview",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'reviewee',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        driverVerificationRequest: {
            name: 'DriverVerificationRequest', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, licencePhotos: {
                    name: "licencePhotos",
                    type: "String",
                    isArray: true,
                }, selfie: {
                    name: "selfie",
                    type: "String",
                }, status: {
                    name: "status",
                    type: "DriverVerificationRequestStatus",
                }, driver: {
                    name: "driver",
                    type: "User",
                    isDataModel: true,
                    backLink: 'driverVerificationRequest',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "driverId" },
                }, driverId: {
                    name: "driverId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'driver',
                    defaultValueProvider: $default$DriverVerificationRequest$driverId,
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, driverId: {
                    name: "driverId",
                    fields: ["driverId"]
                },
            }
            ,
        }
        ,
        car: {
            name: 'Car', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, type: {
                    name: "type",
                    type: "CarType",
                }, plate: {
                    name: "plate",
                    type: "String",
                }, mark: {
                    name: "mark",
                    type: "String",
                }, capacity: {
                    name: "capacity",
                    type: "Int",
                }, status: {
                    name: "status",
                    type: "CarStatus",
                    attributes: [{ "name": "@default", "args": [] }],
                }, photos: {
                    name: "photos",
                    type: "String",
                    isArray: true,
                }, licensePhotos: {
                    name: "licensePhotos",
                    type: "String",
                    isArray: true,
                }, fuelType: {
                    name: "fuelType",
                    type: "CarFuelType",
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'cars',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'owner',
                    defaultValueProvider: $default$Car$ownerId,
                }, rides: {
                    name: "rides",
                    type: "Ride",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'car',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        ride: {
            name: 'Ride', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, availableSeats: {
                    name: "availableSeats",
                    type: "Int",
                }, price: {
                    name: "price",
                    type: "Float",
                }, from: {
                    name: "from",
                    type: "String",
                }, to: {
                    name: "to",
                    type: "String",
                }, departure: {
                    name: "departure",
                    type: "DateTime",
                }, distance: {
                    name: "distance",
                    type: "Float",
                }, duration: {
                    name: "duration",
                    type: "Float",
                }, driver: {
                    name: "driver",
                    type: "User",
                    isDataModel: true,
                    backLink: 'ridesAsDriver',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "driverId" },
                }, driverId: {
                    name: "driverId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'driver',
                    defaultValueProvider: $default$Ride$driverId,
                }, passengers: {
                    name: "passengers",
                    type: "User",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'ridesAsPassenger',
                }, rules: {
                    name: "rules",
                    type: "Rule",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'rides',
                    isRelationOwner: true,
                }, car: {
                    name: "car",
                    type: "Car",
                    isDataModel: true,
                    backLink: 'rides',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "carId" },
                }, carId: {
                    name: "carId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'car',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        rule: {
            name: 'Rule', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, description: {
                    name: "description",
                    type: "String",
                }, price: {
                    name: "price",
                    type: "Float",
                }, rides: {
                    name: "rides",
                    type: "Ride",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'rules',
                    isRelationOwner: true,
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        userReview: {
            name: 'UserReview', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, comment: {
                    name: "comment",
                    type: "String",
                }, rating: {
                    name: "rating",
                    type: "Float",
                }, author: {
                    name: "author",
                    type: "User",
                    isDataModel: true,
                    backLink: 'userReviewsByMe',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "authorId" },
                }, authorId: {
                    name: "authorId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'author',
                    defaultValueProvider: $default$UserReview$authorId,
                }, reviewee: {
                    name: "reviewee",
                    type: "User",
                    isDataModel: true,
                    backLink: 'userReviewsAboutMe',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "revieweeId" },
                }, revieweeId: {
                    name: "revieweeId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'reviewee',
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
    }
    ,
    authModel: 'User'
};
function $default$DriverVerificationRequest$driverId(user: any): unknown {
    return user?.id;
}

function $default$Car$ownerId(user: any): unknown {
    return user?.id;
}

function $default$Ride$driverId(user: any): unknown {
    return user?.id;
}

function $default$UserReview$authorId(user: any): unknown {
    return user?.id;
}
export default metadata;
