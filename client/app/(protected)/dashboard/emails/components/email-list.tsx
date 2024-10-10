import { formatDate } from "date-fns";

interface MailListProps {
  mail: string;
  date: string;
  subject: string;
  message: string;
}

export function EmailList({ mail, date, subject, message }: MailListProps) {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0 w-full">
      <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{mail}</div>
            </div>
            <div className="ml-4 text-xs">
              {formatDate(new Date(date), "dd/MM/yyyy")}
            </div>
          </div>
          <div className="text-xs font-medium">{subject}</div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {message.substring(0, 300)}
        </div>
      </button>
    </div>
  );
}
