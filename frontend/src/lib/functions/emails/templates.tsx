import { User } from "@prisma/client";
import { sendEmail } from "./send-email";
import {
    Html,
    Text,
    Body,
    Head,
    Container,
    Preview,
    Heading,
    Tailwind,
    Img,
    Section,
    Link,
} from "@react-email/components";

export async function sendEmailToDriverThatCarIsFull({ to }: { to: string[] }) {
    await sendEmail({
        to,
        subject: "Your car is full",
        senderName: "Hoppla",
        htmlRender: ({ user }: { user: User }) => (
            <Html>
                <Head></Head>
                <Preview>Are you ready? {user.name}</Preview>
                <Tailwind>
                    <Body className={`bg-white`}>
                        <Container className="w-[450px] px-4 py-6 background-image relative">
                            <Section className="w-[90%] py-5 px-4 flex flex-col justify-start items-start gap-5 bg-white rounded-md shadow-md">
                                <Text className="w-full my-1 text-start text-2xl font-bold text-orange-500">
                                    Hey Driver ⚡ {user.name}
                                </Text>

                                <Section className={`h-full`}>
                                    <Text
                                        className={`text-xl my-2 font-semibold text-black`}
                                    >
                                        Your Car is Full 🚗,
                                        <span className="text-2xl text-green-400 mx-2">
                                            Good Way...
                                        </span>
                                    </Text>
                                </Section>
                            </Section>
                        </Container>
                    </Body>
                </Tailwind>
            </Html>
        ),
    });
}

export async function sendEmailToPassengersThatRideIsCancelled({
    to,
}: {
    to: string[];
}) {
    await sendEmail({
        to,
        subject: "Your ride is cancelled",
        senderName: "Hoppla",
        htmlRender: ({ user }: { user: User }) => (
            <Html>
                <Head></Head>
                <Preview>Are you ready? {user.name}</Preview>
                <Tailwind>
                    <Body className={`bg-white`}>
                        <Container className="w-[450px] px-4 py-6 background-image relative">
                            Cancelleed bla bla
                        </Container>
                    </Body>
                </Tailwind>
            </Html>
        ),
    });
}
