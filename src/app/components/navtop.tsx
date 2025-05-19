import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function NavTop() {
    return (
        <div className="flex justify-between min-w-md p-4 items-center" >
            <div>
                <h1 className="text-3xl font-bold font-serif" >NickFood</h1>
                <p className="text-sm text-muted-foreground" >Peça sua comida favorita!</p>
            </div>
            <Avatar className="w-12 h-12">
                <AvatarImage src="/nick.JPG" alt="Nick" />
                <AvatarFallback>NF</AvatarFallback>
            </Avatar>
        </div>
    );
}