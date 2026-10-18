export function validateRequiredText(
  value: string,
  min = 1,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";
  if (trimmed.length < min) {
    return `Please add a little more detail (at least ${min} characters).`;
  }
  return null;
}

export function validateHttpUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Use a link that starts with http:// or https://.";
    }
    if (!url.hostname.includes(".")) {
      return "Enter a complete web address, like https://example.com.";
    }
    return null;
  } catch {
    return "Enter a valid web address, like https://example.com.";
  }
}

export function validateOptionalHttpUrl(value: string): string | null {
  if (!value.trim()) return null;
  return validateHttpUrl(value);
}

export function validateEmail(value: string, required: boolean): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return required ? "Email is required so we can reply." : null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return null;
}

export function validateRequiredChoice(value: string): string | null {
  return value.trim() ? null : "Please choose an option.";
}

export function validateRequiredGroup(values: string[]): string | null {
  return values.length > 0 ? null : "Choose at least one option.";
}

export function focusFirstInvalid(ids: string[]) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      block: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    el.focus();
    return;
  }
}
