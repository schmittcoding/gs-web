"use client";

import Coin from "@/components/common/coin";
import { DataGrid, DataGridColumn } from "@/components/ui/data-grid";
import { CartItem } from "@/lib/cart/types.cart";
import { useMemo } from "react";
import ItemCheckoutThumbnail from "./thumbnail.checkout";
import { pluralizeItem } from "./utils.checkout";

type OrderSummarySectionProps = {
  items: CartItem[];
  syncing: boolean;
};

function useColumns() {
  return useMemo<DataGridColumn<CartItem>[]>(
    () => [
      {
        key: "item_name",
        header: "Item Name",
        render: ({ item_image, item_name }) => (
          <div className="flex items-center gap-2 lg:max-w-30">
            <ItemCheckoutThumbnail name={item_name} src={item_image} />
            <span>{item_name}</span>
          </div>
        ),
      },
      {
        key: "item_price",
        header: "Price",
        render: (row) => (
          <Coin
            value={row.final_price}
            className="text-[14px]"
            {...(row.final_price < row.item_price && {
              prevValue: row.item_price,
            })}
          />
        ),
      },
      {
        key: "quantity",
        header: "Quantity",
        render: (row) => row.quantity,
      },
      {
        key: "sub_total",
        header: "Sub Total",
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums",
        render: (row) => (
          <Coin
            className="text-[14px] flex-row-reverse"
            value={row.final_price * row.quantity}
          />
        ),
      },
    ],
    [],
  );
}

export default function OrderSummarySection({
  items,
  syncing,
}: OrderSummarySectionProps) {
  const columns = useColumns();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground">
        <p className="text-sm">All items in your cart are unavailable.</p>
      </div>
    );
  }

  return (
    <DataGrid
      className="h-max max-h-none"
      columns={columns}
      data={items}
      loading={syncing}
      rowKey={(row) => row.product_num}
      title={`Order Summary (${items.length} ${pluralizeItem(items.length)})`}
      emptyMessage="All items in your cart are unavailable."
    />
  );
}
