
const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          
          <span className="font-display text-sm tracking-wider text-muted-foreground">
            MAMAS FC © 2026
          </span>
        </div>
        <div className="flex gap-6">
          {["Instagram", "Twitter", "YouTube"].map((social) => (
            <a key={social} href="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;