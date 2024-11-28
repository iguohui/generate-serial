import { Form, ActionPanel, Action, showToast, getPreferenceValues, Clipboard } from "@raycast/api";

export default function Command() {
  //
  const preferences = getPreferenceValues();
  const defaultCount = preferences.defaultCount || 10;
  const defaultPrefix = preferences.prefix || "";
  const defaultSuffix = preferences.suffix || "";

  function handleSubmit(values: { count: string; start: string; prefix: string; suffix: string }) {
    const count = parseInt(values.count);
    const start = parseInt(values.start);
    const prefix = values.prefix;
    const suffix = values.suffix;

    if (isNaN(count) || isNaN(start)) {
      showToast({ title: "Invalid Input", message: "Please enter valid numbers" });
      return;
    }

    const sequence = [];
    for (let i = start; i < start + count; i++) {
      sequence.push(`${prefix}${i}${suffix}`);
    }

    const textToCopy = sequence.join("\n");

    //
    Clipboard.copy(textToCopy)
      .then(() => {
        showToast({ title: "Copied to Clipboard", message: `Generated ${count} numbers` });
      })
      .catch(() => {
        showToast({ title: "Error", message: "Failed to copy to clipboard" });
      });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Generate a sequence of numbers with a specified prefix, suffix, and starting point." />
      <Form.TextField
        id="count"
        title="Number of items"
        placeholder="Enter the number of items"
        defaultValue={String(defaultCount)}
        keyboardType="numberPad"
      />
      <Form.TextField
        id="start"
        title="Starting number"
        placeholder="Enter the starting number"
        defaultValue="1"
        keyboardType="numberPad"
      />
      <Form.TextField id="prefix" title="Prefix" placeholder="Enter prefix" defaultValue={defaultPrefix} />
      <Form.TextField id="suffix" title="Suffix" placeholder="Enter suffix" defaultValue={defaultSuffix} />
    </Form>
  );
}
