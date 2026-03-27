export const FormatDate = (date) => {
    if (!date) return "NA";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
    });
}