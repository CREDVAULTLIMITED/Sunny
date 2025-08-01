/**
 * Sunny Payment Gateway - Dashboard UI Component
 * 
 * A dashboard component for merchants to view payment analytics
 */

class DashboardUI {
  /**
   * Create a new dashboard UI instance
   * 
   * @param {Object} config - Dashboard configuration
   * @param {string} config.containerId - ID of the container element
   * @param {string} config.merchantId - ID of the merchant
   * @param {string} config.apiKey - API key for data fetching
   * @param {string} config.locale - Locale for translations
   * @param {Object} config.theme - Custom theme overrides
   */
  constructor(config = {}) {
    this.config = {
      containerId: 'sunny-dashboard',
      merchantId: '',
      apiKey: '',
      locale: 'en-US',
      theme: {},
      ...config
    };
    
    this.container = null;
    this.data = {
      summary: null,
      dailyData: null,
      customerInsights: null
    };
    this.dateRange = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    };
    this.currency = 'USD';
    this.isLoading = false;
  }
  
  /**
   * Mount the dashboard UI to the container
   */
  async mount() {
    this.container = document.getElementById(this.config.containerId);
    
    if (!this.container) {
      console.error(`Container with ID "${this.config.containerId}" not found`);
      return;
    }
    
    // Set container styles
    this.container.style.fontFamily = "'Montserrat', sans-serif";
    this.container.style.color = '#000000';
    this.container.style.backgroundColor = '#F6F8F6';
    
    // Render the dashboard UI
    this.render();
    
    // Load data
    await this.loadData();
  }
  
  /**
   * Render the dashboard UI
   */
  render() {
    if (!this.container) return;
    
    // Clear the container
    this.container.innerHTML = '';
    
    // Create the header
    const header = document.createElement('div');
    header.style.padding = '1.5rem';
    header.style.backgroundColor = '#FFFFFF';
    header.style.borderBottom = '1px solid #E2E8F0';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    
    // Add logo
    const logo = document.createElement('img');
    logo.src = '/sunny/src/ui/assets/images/logo-no-bg.png';
    logo.alt = 'Sunny Payments';
    logo.style.height = '2rem';
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Payment Dashboard';
    title.style.fontSize = '1.5rem';
    title.style.fontWeight = '700';
    title.style.margin = '0';
    
    // Add date range selector
    const dateRangeSelector = this.createDateRangeSelector();
    
    header.appendChild(logo);
    header.appendChild(title);
    header.appendChild(dateRangeSelector);
    this.container.appendChild(header);
    
    // Create the main content
    const content = document.createElement('div');
    content.style.padding = '1.5rem';
    content.style.display = 'grid';
    content.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    content.style.gap = '1.5rem';
    
    // Add summary cards
    const summaryCards = this.createSummaryCards();
    content.appendChild(summaryCards);
    
    this.container.appendChild(content);
    
    // Create the charts section
    const chartsSection = document.createElement('div');
    chartsSection.style.padding = '0 1.5rem 1.5rem';
    
    // Add transaction chart
    const transactionChart = this.createTransactionChart();
    chartsSection.appendChild(transactionChart);
    
    // Add payment methods chart
    const paymentMethodsChart = this.createPaymentMethodsChart();
    chartsSection.appendChild(paymentMethodsChart);
    
    this.container.appendChild(chartsSection);
    
    // Create the tables section
    const tablesSection = document.createElement('div');
    tablesSection.style.padding = '0 1.5rem 1.5rem';
    
    // Add recent transactions table
    const recentTransactionsTable = this.createRecentTransactionsTable();
    tablesSection.appendChild(recentTransactionsTable);
    
    this.container.appendChild(tablesSection);
  }
  
  /**
   * Load dashboard data
   */
  async loadData() {
    this.isLoading = true;
    this.showLoadingState();
    
    try {
      // In a real implementation, this would fetch data from the API
      // For this example, we'll use mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      this.data.summary = {
        transactions: {
          count: 1245,
          volume: 8750000,
          currency: this.currency,
          average: 7028,
          successful: 1198,
          failed: 47,
          successRate: 96.2
        },
        byPaymentMethod: [
          { method: 'card', count: 875, volume: 6125000, percentage: 70.0 },
          { method: 'bank_transfer', count: 156, volume: 1365000, percentage: 15.6 },
          { method: 'mobile_money', count: 98, volume: 735000, percentage: 8.4 },
          { method: 'crypto', count: 45, volume: 315000, percentage: 3.6 },
          { method: 'apple_pay', count: 42, volume: 126000, percentage: 1.4 },
          { method: 'google_pay', count: 29, volume: 84000, percentage: 1.0 }
        ],
        fees: {
          total: 262500,
          currency: this.currency
        }
      };
      
      this.data.dailyData = this.generateDailyData();
      
      this.data.customerInsights = {
        newCustomers: 342,
        returningCustomers: 687,
        totalCustomers: 1029,
        averageTransactionsPerCustomer: 1.8
      };
      
      this.updateDashboard();
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      this.showErrorState();
    } finally {
      this.isLoading = false;
    }
  }
  
  /**
   * Show loading state
   */
  showLoadingState() {
    const cards = this.container.querySelectorAll('.summary-card-value');
    cards.forEach(card => {
      card.textContent = 'Loading...';
    });
  }
  
  /**
   * Show error state
   */
  showErrorState() {
    const cards = this.container.querySelectorAll('.summary-card-value');
    cards.forEach(card => {
      card.textContent = 'Error loading data';
      card.style.color = '#EF4444';
    });
  }
  
  /**
   * Update the dashboard with loaded data
   */
  updateDashboard() {
    if (!this.data.summary) return;
    
    // Update summary cards
    const volumeCard = this.container.querySelector('#summary-volume .summary-card-value');
    if (volumeCard) {
      volumeCard.textContent = new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.data.summary.transactions.currency
      }).format(this.data.summary.transactions.volume / 100);
    }
    
    const countCard = this.container.querySelector('#summary-count .summary-card-value');
    if (countCard) {
      countCard.textContent = new Intl.NumberFormat(this.config.locale).format(this.data.summary.transactions.count);
    }
    
    const successRateCard = this.container.querySelector('#summary-success-rate .summary-card-value');
    if (successRateCard) {
      successRateCard.textContent = `${this.data.summary.transactions.successRate}%`;
    }
    
    const feesCard = this.container.querySelector('#summary-fees .summary-card-value');
    if (feesCard) {
      feesCard.textContent = new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.data.summary.fees.currency
      }).format(this.data.summary.fees.total / 100);
    }
    
    // Update charts
    // In a real implementation, this would update the charts with the loaded data
  }
  
  /**
   * Create date range selector
   * 
   * @returns {HTMLElement} Date range selector
   */
  createDateRangeSelector() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '0.5rem';
    
    const label = document.createElement('span');
    label.textContent = 'Date Range:';
    label.style.fontSize = '0.875rem';
    label.style.color = '#64748B';
    
    const select = document.createElement('select');
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #E2E8F0';
    select.style.borderRadius = '0.25rem';
    select.style.backgroundColor = '#FFFFFF';
    
    const options = [
      { value: '7d', label: 'Last 7 days' },
      { value: '30d', label: 'Last 30 days' },
      { value: '90d', label: 'Last 90 days' },
      { value: 'ytd', label: 'Year to date' },
      { value: 'custom', label: 'Custom range' }
    ];
    
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      optionElement.selected = option.value === '30d';
      select.appendChild(optionElement);
    });
    
    select.addEventListener('change', (event) => {
      this.handleDateRangeChange(event.target.value);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
  }
  
  /**
   * Create summary cards
   * 
   * @returns {HTMLElement} Summary cards container
   */
  createSummaryCards() {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    container.style.gap = '1rem';
    container.style.width = '100%';
    
    // Transaction volume
    const volumeCard = this.createSummaryCard({
      id: 'summary-volume',
      title: 'Transaction Volume',
      value: '...',
      icon: '💰',
      color: '#02A669'
    });
    
    // Transaction count
    const countCard = this.createSummaryCard({
      id: 'summary-count',
      title: 'Transaction Count',
      value: '...',
      icon: '🔢',
      color: '#0177A5'
    });
    
    // Success rate
    const successRateCard = this.createSummaryCard({
      id: 'summary-success-rate',
      title: 'Success Rate',
      value: '...',
      icon: '✅',
      color: '#05B19B'
    });
    
    // Fees
    const feesCard = this.createSummaryCard({
      id: 'summary-fees',
      title: 'Total Fees',
      value: '...',
      icon: '💸',
      color: '#64748B'
    });
    
    container.appendChild(volumeCard);
    container.appendChild(countCard);
    container.appendChild(successRateCard);
    container.appendChild(feesCard);
    
    return container;
  }
  
  /**
   * Create a summary card
   * 
   * @param {Object} options - Card options
   * @param {string} options.id - Card ID
   * @param {string} options.title - Card title
   * @param {string} options.value - Card value
   * @param {string} options.icon - Card icon
   * @param {string} options.color - Card color
   * @returns {HTMLElement} Summary card
   */
  createSummaryCard({ id, title, value, icon, color }) {
    const card = document.createElement('div');
    card.id = id;
    card.className = 'summary-card';
    card.style.backgroundColor = '#FFFFFF';
    card.style.borderRadius = '0.5rem';
    card.style.padding = '1.5rem';
    card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    
    const cardHeader = document.createElement('div');
    cardHeader.style.display = 'flex';
    cardHeader.style.alignItems = 'center';
    cardHeader.style.justifyContent = 'space-between';
    cardHeader.style.marginBottom = '1rem';
    
    const cardTitle = document.createElement('div');
    cardTitle.textContent = title;
    cardTitle.style.fontSize = '0.875rem';
    cardTitle.style.color = '#64748B';
    
    const cardIcon = document.createElement('div');
    cardIcon.textContent = icon;
    cardIcon.style.fontSize = '1.5rem';
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardIcon);
    
    const cardValue = document.createElement('div');
    cardValue.className = 'summary-card-value';
    cardValue.textContent = value;
    cardValue.style.fontSize = '1.5rem';
    cardValue.style.fontWeight = '700';
    cardValue.style.color = color;
    
    card.appendChild(cardHeader);
    card.appendChild(cardValue);
    
    return card;
  }
  
  /**
   * Create transaction chart
   * 
   * @returns {HTMLElement} Transaction chart container
   */
  createTransactionChart() {
    const container = document.createElement('div');
    container.style.backgroundColor = '#FFFFFF';
    container.style.borderRadius = '0.5rem';
    container.style.padding = '1.5rem';
    container.style.marginBottom = '1.5rem';
    container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '1rem';
    
    const title = document.createElement('h2');
    title.textContent = 'Transaction Volume';
    title.style.fontSize = '1.25rem';
    title.style.fontWeight = '600';
    title.style.margin = '0';
    
    header.appendChild(title);
    
    const chartPlaceholder = document.createElement('div');
    chartPlaceholder.style.height = '300px';
    chartPlaceholder.style.backgroundColor = '#F1F5F9';
    chartPlaceholder.style.borderRadius = '0.25rem';
    chartPlaceholder.style.display = 'flex';
    chartPlaceholder.style.alignItems = 'center';
    chartPlaceholder.style.justifyContent = 'center';
    
    const placeholderText = document.createElement('div');
    placeholderText.textContent = 'Transaction volume chart will be displayed here';
    placeholderText.style.color = '#64748B';
    
    chartPlaceholder.appendChild(placeholderText);
    
    container.appendChild(header);
    container.appendChild(chartPlaceholder);
    
    return container;
  }
  
  /**
   * Create payment methods chart
   * 
   * @returns {HTMLElement} Payment methods chart container
   */
  createPaymentMethodsChart() {
    const container = document.createElement('div');
    container.style.backgroundColor = '#FFFFFF';
    container.style.borderRadius = '0.5rem';
    container.style.padding = '1.5rem';
    container.style.marginBottom = '1.5rem';
    container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '1rem';
    
    const title = document.createElement('h2');
    title.textContent = 'Payment Methods';
    title.style.fontSize = '1.25rem';
    title.style.fontWeight = '600';
    title.style.margin = '0';
    
    header.appendChild(title);
    
    const chartPlaceholder = document.createElement('div');
    chartPlaceholder.style.height = '300px';
    chartPlaceholder.style.backgroundColor = '#F1F5F9';
    chartPlaceholder.style.borderRadius = '0.25rem';
    chartPlaceholder.style.display = 'flex';
    chartPlaceholder.style.alignItems = 'center';
    chartPlaceholder.style.justifyContent = 'center';
    
    const placeholderText = document.createElement('div');
    placeholderText.textContent = 'Payment methods chart will be displayed here';
    placeholderText.style.color = '#64748B';
    
    chartPlaceholder.appendChild(placeholderText);
    
    container.appendChild(header);
    container.appendChild(chartPlaceholder);
    
    return container;
  }
  
  /**
   * Create recent transactions table
   * 
   * @returns {HTMLElement} Recent transactions table container
   */
  createRecentTransactionsTable() {
    const container = document.createElement('div');
    container.style.backgroundColor = '#FFFFFF';
    container.style.borderRadius = '0.5rem';
    container.style.padding = '1.5rem';
    container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '1rem';
    
    const title = document.createElement('h2');
    title.textContent = 'Recent Transactions';
    title.style.fontSize = '1.25rem';
    title.style.fontWeight = '600';
    title.style.margin = '0';
    
    const viewAllLink = document.createElement('a');
    viewAllLink.textContent = 'View All';
    viewAllLink.href = '#';
    viewAllLink.style.color = '#02A669';
    viewAllLink.style.textDecoration = 'none';
    viewAllLink.style.fontWeight = '500';
    
    header.appendChild(title);
    header.appendChild(viewAllLink);
    
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Transaction ID', 'Date', 'Amount', 'Payment Method', 'Status'];
    
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.padding = '0.75rem';
      th.style.textAlign = 'left';
      th.style.borderBottom = '1px solid #E2E8F0';
      th.style.fontSize = '0.875rem';
      th.style.fontWeight = '600';
      th.style.color = '#64748B';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    
    // Add placeholder rows
    for (let i = 0; i < 5; i++) {
      const row = document.createElement('tr');
      
      const idCell = document.createElement('td');
      idCell.textContent = `txn_${Math.random().toString(36).substring(2, 10)}`;
      idCell.style.padding = '0.75rem';
      idCell.style.borderBottom = '1px solid #E2E8F0';
      
      const dateCell = document.createElement('td');
      const date = new Date();
      date.setDate(date.getDate() - i);
      dateCell.textContent = date.toLocaleDateString(this.config.locale);
      dateCell.style.padding = '0.75rem';
      dateCell.style.borderBottom = '1px solid #E2E8F0';
      
      const amountCell = document.createElement('td');
      amountCell.textContent = new Intl.NumberFormat(this.config.locale, {
        style: 'currency',
        currency: this.currency
      }).format(Math.floor(Math.random() * 10000) / 100);
      amountCell.style.padding = '0.75rem';
      amountCell.style.borderBottom = '1px solid #E2E8F0';
      
      const methodCell = document.createElement('td');
      const methods = ['Card', 'Bank Transfer', 'Mobile Money', 'Crypto'];
      methodCell.textContent = methods[Math.floor(Math.random() * methods.length)];
      methodCell.style.padding = '0.75rem';
      methodCell.style.borderBottom = '1px solid #E2E8F0';
      
      const statusCell = document.createElement('td');
      const statuses = [
        { text: 'Completed', color: '#02A669' },
        { text: 'Processing', color: '#F2C94C' },
        { text: 'Failed', color: '#EF4444' }
      ];
      const status = statuses[Math.floor(Math.random() * (i === 0 ? 1 : statuses.length))];
      
      const statusBadge = document.createElement('span');
      statusBadge.textContent = status.text;
      statusBadge.style.backgroundColor = `${status.color}20`;
      statusBadge.style.color = status.color;
      statusBadge.style.padding = '0.25rem 0.5rem';
      statusBadge.style.borderRadius = '0.25rem';
      statusBadge.style.fontSize = '0.75rem';
      statusBadge.style.fontWeight = '500';
      
      statusCell.appendChild(statusBadge);
      statusCell.style.padding = '0.75rem';
      statusCell.style.borderBottom = '1px solid #E2E8F0';
      
      row.appendChild(idCell);
      row.appendChild(dateCell);
      row.appendChild(amountCell);
      row.appendChild(methodCell);
      row.appendChild(statusCell);
      
      tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    
    container.appendChild(header);
    container.appendChild(table);
    
    return container;
  }
  
  /**
   * Handle date range change
   * 
   * @param {string} range - Selected date range
   */
  handleDateRangeChange(range) {
    const now = new Date();
    let start = new Date();
    
    switch (range) {
      case '7d':
        start.setDate(now.getDate() - 7);
        break;
      case '30d':
        start.setDate(now.getDate() - 30);
        break;
      case '90d':
        start.setDate(now.getDate() - 90);
        break;
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1); // January 1st of current year
        break;
      case 'custom':
        // In a real implementation, this would show a date picker
        alert('Custom date range picker would be shown here');
        return;
    }
    
    this.dateRange = { start, end: now };
    this.loadData();
  }
  
  /**
   * Generate mock daily data
   * 
   * @returns {Array} Daily data
   */
  generateDailyData() {
    const days = [];
    const start = this.dateRange.start;
    const end = this.dateRange.end;
    
    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      const date = day.toISOString().split('T')[0];
      
      // Generate some realistic-looking data with weekend dips
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
      const randomFactor = 0.7 + Math.random() * 0.6; // 0.7-1.3 random factor
      const baseVolume = isWeekend ? 25000 : 40000;
      
      days.push({
        date,
        transactions: Math.floor(isWeekend ? 35 * randomFactor : 55 * randomFactor),
        volume: Math.floor(baseVolume * randomFactor),
        successRate: 95 + Math.random() * 4.5
      });
    }
    
    return days;
  }
}

export default DashboardUI;