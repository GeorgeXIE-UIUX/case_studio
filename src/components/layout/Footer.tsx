export const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/50">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Studio Design. All rights reserved.
        </p>
      </div>
    </footer>
  );
};