export type RideResponse = {
    id: string;
    availableSeats: number;
    price: string;
    from: string;
    to: string;
    departure: Date;
    distance: number;
    duration: number;
    driver: {
        id: string;
        profileImg: string;
        name: string;
        averageRating: number;
    };
    car: {
        id: string;
        type: "STANDARD" | "MINIVAN";
    };
    rules: {
        id: string;
        description: string;
    }[];
    passengers: {
        id: string;
        profileImg: string;
        name: string;
    }[];
};
