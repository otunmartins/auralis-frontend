import MoleculeDetail from "@/containers/Predictions/MoleculeDetail";

interface MoleculePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoleculePage({ params }: MoleculePageProps) {
  const { id } = await params; // Await the params to resolve
  return <MoleculeDetail moleculeId={id} />;
}
