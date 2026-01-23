import { TestCase, GenerateResponse } from './types'

export function downloadJSON(data: GenerateResponse): void {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  triggerDownload(blob, 'test-cases.json')
}

export function downloadCSV(data: GenerateResponse): void {
  const headers = ['Test Case ID', 'Title', 'Category', 'Expected Result', 'Steps', 'Test Data']
  
  const rows: string[][] = data.cases.map(testCase => [
    testCase.id,
    `"${testCase.title.replace(/"/g, '""')}"`,
    testCase.category,
    `"${testCase.expectedResult.replace(/"/g, '""')}"`,
    `"${testCase.steps.join(' | ').replace(/"/g, '""')}"`,
    `"${(testCase.testData || '').replace(/"/g, '""')}"`
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, 'test-cases.csv')
}

export async function downloadExcel(data: GenerateResponse): Promise<void> {
  // Dynamically import xlsx to keep bundle size smaller if not used
  const XLSX = await import('xlsx')
  
  // Prepare data for Excel
  const worksheetData = [
    ['Test Case ID', 'Title', 'Category', 'Expected Result', 'Steps', 'Test Data', 'Prompt Tokens', 'Completion Tokens'],
    ...data.cases.map(testCase => [
      testCase.id,
      testCase.title,
      testCase.category,
      testCase.expectedResult,
      testCase.steps.join('\n'),
      testCase.testData || '',
      data.promptTokens,
      data.completionTokens
    ])
  ]
  
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
  
  // Set column widths
  worksheet['!cols'] = [
    { wch: 12 },  // Test Case ID
    { wch: 25 },  // Title
    { wch: 15 },  // Category
    { wch: 30 },  // Expected Result
    { wch: 40 },  // Steps
    { wch: 20 },  // Test Data
    { wch: 15 },  // Prompt Tokens
    { wch: 18 }   // Completion Tokens
  ]
  
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Cases')
  XLSX.writeFile(workbook, 'test-cases.xlsx')
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
