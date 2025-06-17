

//Generic Mock Data

export const sampleAudits = [
  { id: '1', name: 'RTU-101', status: 'Completed', building: 'Main Office, Floor 1', date: '2024-04-15', condition: 'Good' },
  { id: '2', name: 'SSAC-202', status: 'In Progress', building: 'Tech Suite A', date: '2024-03-05', condition: 'Critical' },
  { id: '3', name: 'AHU-303', status: 'Completed', building: 'Operations Wing', date: '2024-03-28', condition: 'Fair' },
  { id: '4', name: 'CH-404', status: 'Completed', building: 'Mechanical Room', date: '2024-02-01', condition: 'Good' },
];

export const sampleAssetsData = [
  { id: '1', name: 'Cooling Unit', status: 'Operational', building: 'Main Office, Floor 1', date: '2024-04-15', condition: 'Excellent' },
  { id: '2', name: 'Heat Pump', status: 'Need Maintenance', building: 'Operations Wing', date: '2024-03-28', condition: 'Critical' },
  { id: '3', name: 'Exhaust Fan', status: 'Operational', building: 'Mechanical Room', date: '2024-02-01', condition: 'Excellent' },
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


