import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function NavTop() {
  return (
    <div className="flex justify-between w-full items-center mb-6">
      <div>
        <h1 className="text-4xl font-bold font-serif">NickFood</h1>
        <p className="text-md text-gray-500">Peça sua comida favorita!</p>
      </div>
      <Avatar className="w-14 h-14">
        <AvatarImage src="/nick.JPG" alt="Nick" />
        <AvatarFallback>NF</AvatarFallback>
      </Avatar>
    </div>
  );
}