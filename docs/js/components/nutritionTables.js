import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByFoodCode } from "../services/imageService.js";

export function renderNutritionTables(items, selectedTypes) {
  if (!items.length) {
    return renderNotification("No match found.");
  }
  if (!selectedTypes.length) {
    return renderNotification("Please select at least one nutrition category.");
  }
  return selectedTypes.map((type) => renderTableByType(type, items)).join("");
}

function renderTableByType(type, items) {
  if (type === "description") {
    return renderTable({
      title: "Description",
      columns: [
        { key: "food_name", label: "Food name" },
        { key: "food_group", label: "Food group" },
        { key: "scientific_name", label: "Scientific name" },
        { key: "native_name", label: "Native name" },
        { key: "province", label: "Province" },
      ],
      rows: items,
    });
  }

  if (type === "images") {
    return renderTable({
      title: "Images",
      columns: [
        { key: "food_name", label: "Food name" },
        {
          key: "number_of_images",
          label: "Number of Images",
          render: (item) => {
            const images = getImagesByFoodCode(item.food_code);
            const count = images.length;
            return count > 0
              ? `<span class="tag is-primary image-count-tag open-image-btn"
                   data-foodcode="${escapeHtml(item.food_code)}"
                   data-foodname="${escapeHtml(item.food_name)}">${count}</span>`
              : "-";
          },
        },
      ],
      rows: items,
    });
  }

  const nutrientKeys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type];
        return data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : [];
      }),
    ),
  );

  const columns = [
    { key: "food_name", label: "Food name" },
    ...nutrientKeys.map((key) => ({ key, label: key })),
  ];

  const rows = items.map((item) => ({
    food_name: item.food_name,
    ...(item?.[type] && typeof item[type] === "object" ? item[type] : {}),
  }));

  return renderTable({ title: titleFromKey(type), columns, rows });
}
