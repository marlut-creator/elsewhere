type ToastNoticeProps = {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onDismiss: () => void;
};

export default function ToastNotice({
  message,
  actionLabel,
  actionHref,
  onDismiss,
}: ToastNoticeProps) {
  return (
    <div className="elsewhere-toast" role="status" aria-live="polite">
      <p>{message}</p>
      <div className="elsewhere-toast-actions">
        {actionLabel && actionHref ? (
          <a href={actionHref}>{actionLabel}</a>
        ) : null}
        <button type="button" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
