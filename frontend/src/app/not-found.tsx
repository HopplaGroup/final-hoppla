import { Button } from "@/components/ui/actions/button";
import * as m from "@/paraglide/messages.js";

export default function NotFound() {
    return (
        <div className="container mt-9xl px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-primary">404</h1>

                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {m.super_weary_shrike_commend()}!
                </p>

                <p className="mt-4 text-foreground mb-4">{m.glad_level_gazelle_smile()}</p>

                <Button href="/">{m.aqua_petty_bird_tickle()}</Button>
            </div>
        </div>
    );
}
