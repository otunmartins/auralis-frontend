export interface LogingTableData {
  id: string;
  timestamp: string;
  eventType: "File Upload" | "Login" | "Model Run" | "Api Request" | string;
  description: string;
  riskLevel: {
    level: "High" | "Medium" | "Low";
    value: number;
  };
  uploadedBy: string;
  datasetName: string;
  aiModel: string;
  structure: string;
  confidenceScore: string;
  drugCandidate: {
    isCandidate: boolean;
    value: string;
  };
  moleculeType?: string;
  datePredicted?: string;
  riskFactors?: Array<{
    factor: string;
    value: string;
    threshold: string;
    flag: "green" | "yellow" | "red";
  }>;
}

export const logingTableData: LogingTableData[] = [
  {
    id: "LOG001",
    timestamp: "2024-03-20 10:30:45",
    eventType: "File Upload",
    description: "New dataset uploaded for analysis",
    riskLevel: {
      level: "High",
      value: 0.9,
    },
    uploadedBy: "John Doe",
    datasetName: "Protein Structure Set A",
    aiModel: "AlphaFold",
    structure: "3D Protein",
    confidenceScore: "95%",
    drugCandidate: {
      isCandidate: true,
      value: "Potential",
    },
    moleculeType: "Protein",
    datePredicted: "20-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG002",
    timestamp: "2024-03-20 09:15:22",
    eventType: "Login",
    description: "Structure prediction completed",
    riskLevel: {
      level: "Medium",
      value: 0.6,
    },
    uploadedBy: "Jane Smith",
    datasetName: "Compound Library B",
    aiModel: "DeepChem",
    structure: "Small Molecule",
    confidenceScore: "82%",
    drugCandidate: {
      isCandidate: false,
      value: "Not Viable",
    },
    moleculeType: "Small Molecule",
    datePredicted: "20-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG003",
    timestamp: "2024-03-19 16:45:10",
    eventType: "Model Run",
    description: "AI model training completed",
    riskLevel: {
      level: "Low",
      value: 0.3,
    },
    uploadedBy: "Mike Johnson",
    datasetName: "Training Set C",
    aiModel: "TensorFlow",
    structure: "N/A",
    confidenceScore: "78%",
    drugCandidate: {
      isCandidate: true,
      value: "Promising",
    },
    moleculeType: "N/A",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG004",
    timestamp: "2024-03-19 14:20:33",
    eventType: "Api Request",
    description: "Model validation results",
    riskLevel: {
      level: "High",
      value: 0.95,
    },
    uploadedBy: "Sarah Wilson",
    datasetName: "Validation Set D",
    aiModel: "PyTorch",
    structure: "Protein Complex",
    confidenceScore: "91%",
    drugCandidate: {
      isCandidate: true,
      value: "High Potential",
    },
    moleculeType: "Protein Complex",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG005",
    timestamp: "2024-03-19 11:05:17",
    eventType: "Api Request",
    description: "Processing error encountered",
    riskLevel: {
      level: "High",
      value: 0.8,
    },
    uploadedBy: "Alex Brown",
    datasetName: "Error Log E",
    aiModel: "Custom Model",
    structure: "N/A",
    confidenceScore: "N/A",
    drugCandidate: {
      isCandidate: false,
      value: "Error",
    },
    moleculeType: "N/A",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG006",
    timestamp: "2024-03-20 10:30:45",
    eventType: "File Upload",
    description: "New dataset uploaded for analysis",
    riskLevel: {
      level: "Medium",
      value: 0.9,
    },
    uploadedBy: "John Doe",
    datasetName: "Protein Structure Set A",
    aiModel: "AlphaFold",
    structure: "3D Protein",
    confidenceScore: "95%",
    drugCandidate: {
      isCandidate: true,
      value: "Potential",
    },
    moleculeType: "Protein",
    datePredicted: "20-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG007",
    timestamp: "2024-03-20 09:15:22",
    eventType: "Login",
    description: "Structure prediction completed",
    riskLevel: {
      level: "Low",
      value: 0.6,
    },
    uploadedBy: "Jane Smith",
    datasetName: "Compound Library B",
    aiModel: "DeepChem",
    structure: "Small Molecule",
    confidenceScore: "82%",
    drugCandidate: {
      isCandidate: false,
      value: "Not Viable",
    },
    moleculeType: "Small Molecule",
    datePredicted: "20-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG008",
    timestamp: "2024-03-19 16:45:10",
    eventType: "Model Run",
    description: "AI model training completed",
    riskLevel: {
      level: "High",
      value: 0.3,
    },
    uploadedBy: "Mike Johnson",
    datasetName: "Training Set C",
    aiModel: "TensorFlow",
    structure: "N/A",
    confidenceScore: "78%",
    drugCandidate: {
      isCandidate: true,
      value: "Promising",
    },
    moleculeType: "N/A",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG009",
    timestamp: "2024-03-19 14:20:33",
    eventType: "Api Request",
    description: "Model validation results",
    riskLevel: {
      level: "Low",
      value: 0.95,
    },
    uploadedBy: "Sarah Wilson",
    datasetName: "Validation Set D",
    aiModel: "PyTorch",
    structure: "Protein Complex",
    confidenceScore: "91%",
    drugCandidate: {
      isCandidate: true,
      value: "High Potential",
    },
    moleculeType: "Protein Complex",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG010",
    timestamp: "2024-03-19 11:05:17",
    eventType: "Api Request",
    description: "Processing error encountered",
    riskLevel: {
      level: "Low",
      value: 0.8,
    },
    uploadedBy: "Alex Brown",
    datasetName: "Error Log E",
    aiModel: "Custom Model",
    structure: "N/A",
    confidenceScore: "N/A",
    drugCandidate: {
      isCandidate: false,
      value: "Error",
    },
    moleculeType: "N/A",
    datePredicted: "19-Mar-24",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "red" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
    ],
  },
  {
    id: "LOG011",
    timestamp: "2025-04-10 14:40",
    eventType: "File Upload",
    description: "Error during prediction run",
    riskLevel: {
      level: "Medium",
      value: 0.6,
    },
    uploadedBy: "Dr. Samina Khan",
    datasetName: "Antiviral_Lead_Series.csv",
    aiModel: "Model-X",
    structure: "Protein",
    confidenceScore: "100%",
    drugCandidate: {
      isCandidate: false,
      value: "Error",
    },
    moleculeType: "Protein",
    datePredicted: "16-Apr-25",
    riskFactors: [
      { factor: "Toxic", value: "0.9", threshold: ">0.7", flag: "yellow" },
      { factor: "LogP", value: "2.20", threshold: "<3", flag: "green" },
      {
        factor: "Molecular Weight",
        value: "1.1",
        threshold: "<500",
        flag: "green",
      },
      { factor: "LogP", value: "1.2", threshold: "<3", flag: "red" },
    ],
  },
];
