type Card = {
  id: string;
  title: string;
  description: string;
  models: string[];
  icon: string;
  link: string;
  buttonText?: string;
};

const cardData: Card[] = [
  {
    id: "1",
    title: "Target Identification & Validation",
    description: "Use AI to find and validate biological targets.",
    models: ["GENTRL", "Deep Learning for Antibiotics"],
    icon: "/templates/1.svg",
    link: "#",
  },
  {
    id: "2",
    title: "Molecular Property Prediction",
    description: "Predict ADMET, solubility, and molecular properties.",
    models: ["ChemProp", "MolMapNet"],
    icon: "/templates/2.svg",
    link: "#",
  },
  {
    id: "3",
    title: "De Novo Drug Design",
    description: "Generate new molecules with desired traits.",
    models: ["REINVENT", "GraphINVENT"],
    icon: "/templates/3.svg",
    link: "#",
  },
  {
    id: "4",
    title: "Drug Repurposing",
    description: "Find new uses for approved drugs via AI scanning.",
    models: ["DeepRepurpose", "AI-Driven Repurposing Pipelines"],
    icon: "/templates/4.svg",
    link: "#",
  },
  {
    id: "5",
    title: "Synthetic Route Planning",
    description: "AI-generated cost-effective synthesis pathways.",
    models: ["AIZynthFinder", "Deyvos Labs"],
    icon: "/templates/5.svg",
    link: "#",
  },
  {
    id: "6",
    title: "Toxicity Prediction",
    description: "Predict potential toxicity of compounds using AI.",
    models: ["DeepTox"],
    icon: "/templates/6.svg",
    link: "#",
  },
  {
    id: "7",
    title: "Virtual Screening & Docking",
    description: "Simulate docking and filter large compound libraries.",
    models: ["Deep Docking", "Autodock Enhanced"],
    icon: "/templates/7.svg",
    link: "#",
  },
  {
    id: "8",
    title: "Model Interpretability & Explainability",
    description: "Understand the 'why' behind AI decisions.",
    models: ["SHAP", "LIME", "Drug Discovery Maps"],
    icon: "/templates/8.svg",
    link: "#",
  },
  {
    id: "9",
    title: "Data Management & Benchmarking",
    description: "Standardized datasets and benchmarks for fair evaluation.",
    models: ["MoleculeNet", "MOSES"],
    icon: "/templates/9.svg",
    link: "#",
  },
  {
    id: "10",
    title: "Clinical Trial Optimization",
    description: "AI-assisted trial design and patient targeting.",
    models: ["Exscientia AI Trials"],
    icon: "/templates/10.svg",
    link: "#",
  },
];

export default cardData;
