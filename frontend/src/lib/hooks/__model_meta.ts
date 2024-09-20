/* eslint-disable */
const metadata = {
    models: {
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, isNewUser: {
                    name: "isNewUser",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": true }] }],
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
                }, birthDate: {
                    name: "birthDate",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, profileImg: {
                    name: "profileImg",
                    type: "String",
                }, bio: {
                    name: "bio",
                    type: "String",
                }, sex: {
                    name: "sex",
                    type: "UserSex",
                    attributes: [{ "name": "@default", "args": [] }],
                }, role: {
                    name: "role",
                    type: "UserRole",
                    attributes: [{ "name": "@default", "args": [] }],
                }, status: {
                    name: "status",
                    type: "UserStatus",
                    attributes: [{ "name": "@default", "args": [] }],
                }, balance: {
                    name: "balance",
                    type: "Float",
                    attributes: [{ "name": "@default", "args": [{ "value": 0 }] }],
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
                }, passengerRides: {
                    name: "passengerRides",
                    type: "RidePassenger",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'passenger',
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
                }, reportsSubmitted: {
                    name: "reportsSubmitted",
                    type: "Report",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'submitter',
                }, reportsReceived: {
                    name: "reportsReceived",
                    type: "Report",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'reported',
                }, notifications: {
                    name: "notifications",
                    type: "UserNotification",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, myFavourites: {
                    name: "myFavourites",
                    type: "UserUserFavorite",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, favouritesOfMine: {
                    name: "favouritesOfMine",
                    type: "UserUserFavorite",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'favorite',
                }, a: {
                    name: "a",
                    type: "UserFavoritedNotification",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
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
        userUserFavorite: {
            name: 'UserUserFavorite', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'myFavourites',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, userId: {
                    name: "userId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'user',
                    defaultValueProvider: $default$UserUserFavorite$userId,
                }, favorite: {
                    name: "favorite",
                    type: "User",
                    isDataModel: true,
                    backLink: 'favouritesOfMine',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "favoriteId" },
                }, favoriteId: {
                    name: "favoriteId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'favorite',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, userId_favoriteId: {
                    name: "userId_favoriteId",
                    fields: ["userId", "favoriteId"]
                },
            }
            ,
        }
        ,
        report: {
            name: 'Report', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, submitterId: {
                    name: "submitterId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'submitter',
                    defaultValueProvider: $default$Report$submitterId,
                }, submitter: {
                    name: "submitter",
                    type: "User",
                    isDataModel: true,
                    backLink: 'reportsSubmitted',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "submitterId" },
                }, reportedId: {
                    name: "reportedId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'reported',
                }, reported: {
                    name: "reported",
                    type: "User",
                    isDataModel: true,
                    backLink: 'reportsReceived',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "reportedId" },
                }, reason: {
                    name: "reason",
                    type: "String",
                }, description: {
                    name: "description",
                    type: "String",
                }, status: {
                    name: "status",
                    type: "ReportStatus",
                    attributes: [{ "name": "@default", "args": [] }],
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
        userNotification: {
            name: 'UserNotification', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, readAt: {
                    name: "readAt",
                    type: "DateTime",
                    isOptional: true,
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'notifications',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, type: {
                    name: "type",
                    type: "String",
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            , discriminator: "type",
        }
        ,
        rideCancelledNotification: {
            name: 'RideCancelledNotification', baseTypes: ['UserNotification'], fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                    inheritedFrom: "UserNotification",
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                    inheritedFrom: "UserNotification",
                }, readAt: {
                    name: "readAt",
                    type: "DateTime",
                    isOptional: true,
                    inheritedFrom: "UserNotification",
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                    inheritedFrom: "UserNotification",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                    inheritedFrom: "UserNotification",
                }, type: {
                    name: "type",
                    type: "String",
                    inheritedFrom: "UserNotification",
                }, reason: {
                    name: "reason",
                    type: "String",
                }, rideId: {
                    name: "rideId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'ride',
                }, ride: {
                    name: "ride",
                    type: "Ride",
                    isDataModel: true,
                    backLink: 'a',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "rideId" },
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
        userFavoritedNotification: {
            name: 'UserFavoritedNotification', baseTypes: ['UserNotification'], fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                    inheritedFrom: "UserNotification",
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                    inheritedFrom: "UserNotification",
                }, readAt: {
                    name: "readAt",
                    type: "DateTime",
                    isOptional: true,
                    inheritedFrom: "UserNotification",
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                    inheritedFrom: "UserNotification",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'a',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                    inheritedFrom: "UserNotification",
                }, type: {
                    name: "type",
                    type: "String",
                    inheritedFrom: "UserNotification",
                }, favouritedBy: {
                    name: "favouritedBy",
                    type: "User",
                    isDataModel: true,
                    backLink: 'a',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "favouritedById" },
                }, favouritedById: {
                    name: "favouritedById",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'favouritedBy',
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
        driverVerificationRequest: {
            name: 'DriverVerificationRequest', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
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
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
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
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
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
                }, ridePassengers: {
                    name: "ridePassengers",
                    type: "RidePassenger",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'ride',
                }, status: {
                    name: "status",
                    type: "RideStatus",
                    attributes: [{ "name": "@default", "args": [] }],
                }, rideRules: {
                    name: "rideRules",
                    type: "RideRule",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'ride',
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
                }, a: {
                    name: "a",
                    type: "RideCancelledNotification",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'ride',
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
        ridePassenger: {
            name: 'RidePassenger', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, passenger: {
                    name: "passenger",
                    type: "User",
                    isDataModel: true,
                    backLink: 'passengerRides',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "passengerId" },
                }, passengerId: {
                    name: "passengerId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    isForeignKey: true,
                    relationField: 'passenger',
                    defaultValueProvider: $default$RidePassenger$passengerId,
                }, ride: {
                    name: "ride",
                    type: "Ride",
                    isDataModel: true,
                    backLink: 'ridePassengers',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "rideId" },
                }, rideId: {
                    name: "rideId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'ride',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, passengerId_rideId: {
                    name: "passengerId_rideId",
                    fields: ["passengerId", "rideId"]
                },
            }
            ,
        }
        ,
        rideRule: {
            name: 'RideRule', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, rule: {
                    name: "rule",
                    type: "Rule",
                    isDataModel: true,
                    backLink: 'ruleRides',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ruleId" },
                }, ruleId: {
                    name: "ruleId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'rule',
                }, ride: {
                    name: "ride",
                    type: "Ride",
                    isDataModel: true,
                    backLink: 'rideRules',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "rideId" },
                }, rideId: {
                    name: "rideId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'ride',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, ruleId_rideId: {
                    name: "ruleId_rideId",
                    fields: ["ruleId", "rideId"]
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
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, description: {
                    name: "description",
                    type: "String",
                }, price: {
                    name: "price",
                    type: "Float",
                }, ruleRides: {
                    name: "ruleRides",
                    type: "RideRule",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'rule',
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
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
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
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, authorId_revieweeId: {
                    name: "authorId_revieweeId",
                    fields: ["authorId", "revieweeId"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        user: ['UserFavoritedNotification'],
    }
    ,
    authModel: 'User'
};
function $default$UserUserFavorite$userId(user: any): unknown {
    return user?.id;
}

function $default$Report$submitterId(user: any): unknown {
    return user?.id;
}

function $default$DriverVerificationRequest$driverId(user: any): unknown {
    return user?.id;
}

function $default$Car$ownerId(user: any): unknown {
    return user?.id;
}

function $default$Ride$driverId(user: any): unknown {
    return user?.id;
}

function $default$RidePassenger$passengerId(user: any): unknown {
    return user?.id;
}

function $default$UserReview$authorId(user: any): unknown {
    return user?.id;
}
export default metadata;
