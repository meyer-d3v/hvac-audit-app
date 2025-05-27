// data/dashboardData.js

export const sampleAudits = [
  { id: '1', name: 'Rooftop Unit 1', status: 'Completed', building : 'Building A, Floor 5', date: '2023-04-15', condition: 'Excellent' },
  { id: '2', name: 'Split system AC 2', status: 'In-progress', building : 'Server Room B', date: '2023-01-05', condition: 'Critical' },
  { id: '3', name: 'Air Handler AUH-3', status: 'Completed', building : 'Office Complex, East Wing', date: '2023-03-28', condition: 'Critical' },
  { id: '4', name: 'Chiller System', status: 'Completed', building : 'Server Room B', date: '2023-01-05', condition: 'Excellent' },
];

export const sampleAssetsData = [
  { id: '1', name: 'Air Conditioner', status: 'Operational', building : 'Building A, Floor 5', date: '2023-04-15', condition: 'Excellent' },
  { id: '2', name: 'Heater', status: 'Needs Maintenance', building : 'Office Complex, East Wing', date: '2023-03-28', condition: 'Critical' },
  { id: '3', name: 'Ventilation Fan', status: 'Operational', building : 'Server Room B', date: '2023-01-05', condition: 'Excellent' },
];

const nonOperationalAssets = [];

for (let i = 0; i < sampleAssetsData.length; i++) {
  if (sampleAssetsData[i].status === "Needs Maintenance") {
    nonOperationalAssets.push(sampleAssetsData[i]);
  }
}


export const dashboardData = {
  totalAudits: 24, //sampleAudits.length,
  needAttention: 5, //nonOperationalAssets.length,
  budgetUsed: 12798,
  recentUpdates: 3,
};
