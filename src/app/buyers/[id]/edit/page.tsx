import CreateEditForm from "@/components/CreateEditForm";
import { prisma } from "@/lib/prisma";

interface EditBuyerPageProps {
  params: { id: string };
}

export default async function EditBuyerPage({ params }: EditBuyerPageProps) {
  const buyer = await prisma.buyer.findUnique({
    where: { id: params.id },
  });

  if (!buyer) {
    return <div className="p-6">Buyer not found</div>;
  }

  return <CreateEditForm buyerId={buyer.id} initialData={buyer} />;
}
