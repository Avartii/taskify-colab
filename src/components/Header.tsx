
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-white/70 backdrop-blur-sm sticky top-0 z-10 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary/90 flex items-center justify-center shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h1" />
            <path d="M16 3h1a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-1" />
            <path d="M12 2v20" />
            <path d="M19 9h2" />
            <path d="M3 9h2" />
            <path d="M19 15h2" />
            <path d="M3 15h2" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">TaskFlow</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M7 12h10" />
              <path d="M10 18h4" />
            </svg>
            <span>Filter</span>
          </div>
        </button>
        
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-9 9c0 4.2 2.28 8.2 6 9.82" />
              <path d="M12 3v8l5 3" />
              <path d="M18.89 20.51s-1.89-1.35-1.89-3.51c0-2.63.89-3 .89-5" />
              <path d="M22 22c-1.37-1.43-2.86-2.5-4.25-2.5-2.04 0-3.5 1.93-3.5 4.5" />
            </svg>
            <span>History</span>
          </div>
        </button>
        
        <button className="flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
