import { Button } from "@/components/ui/actions/button";

export default function NotFound() {
    return (
        <div className="container mt-9xl px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-primary">404</h1>

                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Uh-oh!
                </p>

                <p className="mt-4 text-foreground mb-4">{`We can't find that page.`}</p>

                <Button href="/">Go Back Home</Button>
            </div>
        </div>
    );
}
