export function ErrorCard({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <main className="container mx-auto px-4 pt-24 pb-10">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-10 text-center">
        <p className="text-sm text-destructive">{message}</p>
        {retry && (
          <button
            onClick={retry}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Retry
          </button>
        )}
      </div>
    </main>
  );
}
