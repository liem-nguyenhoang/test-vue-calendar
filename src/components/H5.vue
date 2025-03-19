<!-- TableComponent.vue -->
<template>
    <div class="table-container">
      <div class="table-header">
        <div class="header-cell">Cột 1</div>
        <div class="header-cell">Cột 2</div>
        <div class="header-cell">Cột 3</div>
        <div class="header-cell">Cột 4</div>
        <div class="header-cell">Cột 5</div>
        <div class="header-cell">Cột 6</div>
        <div class="header-cell">Cột 7</div>
      </div>
      <div class="table-body" ref="tableBody">
        <div class="table-row" v-for="(row, index) in tableData" :key="index">
          <div class="table-cell">
            <div v-for="(item, i) in row.col1" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col2" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col3" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col4" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col5" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col6" :key="i" class="item">{{ item }}</div>
          </div>
          <div class="table-cell">
            <div v-for="(item, i) in row.col7" :key="i" class="item">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TableComponent',
    data() {
      return {
        tableData: [
          { 
            col1: ['A1', 'B1', 'C1', 'B1', 'C1', 'B1', 'C1', 'B1', 'C1'], 
            col2: ['D1', 'E1'], 
            col3: [ ], 
            col4: ['G1', 'H1', 'I1'], 
            col5: ['J1', 'K1'], 
            col6: ['L1', 'M1', 'N1'], 
            col7: ['O1', 'P1'] 
          },
          { 
            col1: ['A2'], 
            col2: ['D2', 'E2', 'F2'], 
            col3: ['G2', 'H2'], 
            col4: ['I2'], 
            col5: ['J2', 'K2', 'L2'], 
            col6: ['M2'], 
            col7: ['N2', 'O2', 'P2'] 
          },
          { 
            col1: ['A3', 'B3'], 
            col2: ['D3'], 
            col3: ['E3', 'F3', 'G3'], 
            col4: ['H3', 'I3'], 
            col5: ['J3'], 
            col6: ['K3', 'L3'], 
            col7: ['M3', 'N3'] 
          },
          { 
            col1: ['A4', 'B4', 'C4'], 
            col2: ['D4', 'E4'], 
            col3: ['F4'], 
            col4: ['G4'], 
            col5: ['H4', 'I4'], 
            col6: ['J4', 'K4', 'L4'], 
            col7: ['M4'] 
          },
          { 
            col1: ['A5'], 
            col2: ['B5', 'C5', 'D5'], 
            col3: ['E5', 'F5'], 
            col4: ['G5', 'H5'], 
            col5: ['I5'], 
            col6: ['J5', 'K5'], 
            col7: ['L5', 'M5', 'N5'] 
          },
          { 
            col1: ['A6', 'B6'], 
            col2: ['C6'], 
            col3: [], 
            col4: ['G6'], 
            col5: ['H6', 'I6'], 
            col6: ['J6', 'K6'], 
            col7: ['L6'] 
          },
          { 
            col1: ['A7', 'B7', 'C7'], 
            col2: ['D7', 'E7'], 
            col3: ['F7'], 
            col4: ['G7', 'H7'], 
            col5: ['I7', 'J7'], 
            col6: ['K7'], 
            col7: ['L7', 'M7', 'N7'] 
          }
        ]
      }
    },
    mounted() {
      this.setEqualRowHeights();
    },
    methods: {
      setEqualRowHeights() {
        const rows = this.$refs.tableBody.querySelectorAll('.table-row');
        let maxHeight = 0;
  
        // Tính chiều cao lớn nhất của các hàng
        rows.forEach(row => {
          const rowHeight = row.getBoundingClientRect().height;
          maxHeight = Math.max(maxHeight, rowHeight);
        });
  
        // Áp dụng chiều cao lớn nhất cho tất cả các hàng
        rows.forEach(row => {
          row.style.height = `${maxHeight}px`;
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    border: 1px solid #ddd;
  }
  
  .table-header {
    display: flex;
    width: 100%;
    max-height: 30px;
  }
  
  .header-cell {
    flex: 1;
    padding: 5px;
    text-align: center;
    background-color: #f5f5f5;
    font-weight: bold;
    line-height: 20px;
    /* Không có border cho header */
  }
  
  .table-body {
    width: 100%;
  }
  
  .table-row {
    display: flex;
    width: 100%;
  }
  
  .table-cell {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  .item {
    margin: 5px 0;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .table-cell {
      padding: 8px;
      font-size: 14px;
    }
    .header-cell {
      padding: 4px;
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    .table-cell {
      padding: 6px;
      font-size: 12px;
    }
    .header-cell {
      padding: 3px;
      font-size: 12px;
    }
    .item {
      margin: 3px 0;
    }
  }
  </style>