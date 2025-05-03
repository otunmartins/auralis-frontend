export interface MoleculeData {
  id: string;
  confidenceScore: string;
  aiModel: string;
  drugCandidate: {
    isCandidate: boolean;
    value: string;
  };
  riskLevel: {
    level: "High" | "Medium" | "Low" | "Starter" | "Expert";
  };
  processedOn: string;
  uploadedBy: string;
  datasetName: string;
}

export const initialData: MoleculeData[] = [
  {
    id: "MOL-001",
    confidenceScore: "95%",
    aiModel: "Model-X",
    drugCandidate: {
      isCandidate: true,
      value: "Yes",
    },
    riskLevel: {
      level: "High",
    },
    processedOn: "April 8, 2025, 2:15 PM",
    uploadedBy: "Dr. Samina Khan",
    datasetName: "Antiviral_Lead_Series.csv",
  },
  {
    id: "MOL-002",
    confidenceScore: "72%",
    aiModel: "Model-Y",
    drugCandidate: {
      isCandidate: false,
      value: "12-02-2025",
    },
    riskLevel: {
      level: "Low",
    },
    processedOn: "April 8, 2025, 2:30 PM",
    uploadedBy: "Dr. James Wilson",
    datasetName: "Anti_Inflammatory_Compounds.csv",
  },
  {
    id: "MOL-003",
    confidenceScore: "82%",
    aiModel: "Model-Z",
    drugCandidate: {
      isCandidate: true,
      value: "Yes",
    },
    riskLevel: {
      level: "High",
    },
    processedOn: "April 8, 2025, 3:10 PM",
    uploadedBy: "Dr. Samina Khan",
    datasetName: "Antiviral_Lead_Series.csv",
  },
  {
    id: "MOL-004",
    confidenceScore: "90%",
    aiModel: "Model-X",
    drugCandidate: {
      isCandidate: false,
      value: "12-02-2025",
    },
    riskLevel: {
      level: "Medium",
    },
    processedOn: "April 9, 2025, 10:45 AM",
    uploadedBy: "Dr. Emma Chen",
    datasetName: "Neurological_Targets.csv",
  },
  {
    id: "MOL-005",
    confidenceScore: "24%",
    aiModel: "Model-Y",
    drugCandidate: {
      isCandidate: true,
      value: "Yes",
    },
    riskLevel: {
      level: "Low",
    },
    processedOn: "April 9, 2025, 11:20 AM",
    uploadedBy: "Dr. James Wilson",
    datasetName: "Anti_Inflammatory_Compounds.csv",
  },
  {
    id: "MOL-006",
    confidenceScore: "43%",
    aiModel: "Model-A",
    drugCandidate: {
      isCandidate: false,
      value: "12-02-2025",
    },
    riskLevel: {
      level: "Medium",
    },
    processedOn: "April 9, 2025, 1:35 PM",
    uploadedBy: "Dr. Emma Chen",
    datasetName: "Cardiovascular_Series.csv",
  },
  {
    id: "MOL-007",
    confidenceScore: "95%",
    aiModel: "Model-X",
    drugCandidate: {
      isCandidate: true,
      value: "Yes",
    },
    riskLevel: {
      level: "High",
    },
    processedOn: "April 10, 2025, 9:05 AM",
    uploadedBy: "Dr. Samina Khan",
    datasetName: "Antiviral_Lead_Series.csv",
  },
  {
    id: "MOL-008",
    confidenceScore: "72%",
    aiModel: "Model-Y",
    drugCandidate: {
      isCandidate: false,
      value: "12-02-2025",
    },
    riskLevel: {
      level: "Low",
    },
    processedOn: "April 10, 2025, 10:15 AM",
    uploadedBy: "Dr. James Wilson",
    datasetName: "Anti_Inflammatory_Compounds.csv",
  },
  {
    id: "MOL-009",
    confidenceScore: "82%",
    aiModel: "Model-Z",
    drugCandidate: {
      isCandidate: true,
      value: "Yes",
    },
    riskLevel: {
      level: "High",
    },
    processedOn: "April 10, 2025, 2:30 PM",
    uploadedBy: "Dr. Samina Khan",
    datasetName: "Antiviral_Lead_Series.csv",
  },
  {
    id: "MOL-010",
    confidenceScore: "90%",
    aiModel: "Model-X",
    drugCandidate: {
      isCandidate: false,
      value: "12-02-2025",
    },
    riskLevel: {
      level: "Medium",
    },
    processedOn: "April 10, 2025, 3:24 PM",
    uploadedBy: "Dr. Emma Chen",
    datasetName: "Neurological_Targets.csv",
  },
];
