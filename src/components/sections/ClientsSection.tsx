const clients = [
  "Brand A",
  "Company B",
  "Startup C",
  "Agency D",
  "Tech E",
  "Studio F",
];

export const ClientsSection = () => {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-6">
        <p className="text-center text-muted-foreground text-sm mb-8">
          曾合作過的品牌與客戶
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client) => (
            <div
              key={client}
              className="font-display text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
