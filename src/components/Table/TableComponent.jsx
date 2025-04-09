import React from "react";
import { useTranslation } from "react-i18next";

const TableComponent = ({ orders, columns, title }) => {
  const {t}=useTranslation()
  console.log(orders,"common table")
  return (
    <div className="min-h-screen w-full max-w-screen bg-white p-5">
      {/* Title */}
      <div className="mt-5">
        <h1 className="text-5xl font-semibold">{title || t("ordersHistory")}</h1>
      </div>

      {/* Table */}
      <table className="w-full table-auto mt-5">
        <thead className="bg-purple-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left text-black">
                {t(col.label)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="overflow-y-auto">
          {orders?.length > 0 ? (
            orders.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-3 text-left">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-3 text-center text-gray-500">
                {t("noOrdersFound")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent
