<template>
    <vue-good-table
  mode="remote"
  @on-page-change="onPageChange"
  @on-sort-change="onSortChange"
  @on-column-filter="onColumnFilter"
  @on-per-page-change="onPerPageChange"
  :totalRows="totalRecords"
  :isLoading.sync="isLoading"
  :pagination-options="{
    enabled: true,
    perPage: this.serverParams.perPage,
    perPageDropdown: [1,5,10],
    nextLabel: 'next',
    prevLabel: 'prev',
  }"
  :rows="rows"
  :columns="columns">
    <div slot="table-actions">
      <button> Remove </button>
      <button> Edit </button>
    </div>
    <template slot="table-row" slot-scope="props">
       <span v-if="(props.column.field == 'remove' )">
         <button>REMOVE</button>
         </span>


    </template>
  </vue-good-table>
</template>
<script>
import axios from 'axios'


export default {
    data() {
  return {
    interactWith: 'nope',
    isLoading: false,
        rows: [],
    totalRecords: 0,
    serverParams: {
      columnFilters: {
      },
      sort: {
        field: 'first_name',
        type: '',
      },
      page: 1,
      perPage: 10
    },
    columns: [
      {
          label: 'ID',
          field: 'id',
      },
      {
          label: 'First Name',
          field: 'first_name',
          filterable: true
      },
      {
          label: 'Last Name',
          field: 'last_name',
          filterable: true
      },
      {
          label: 'Email',
          field: 'email',
          filterable: true
      },
      {
          label: 'Address',
          field: 'address',
          filterable: true
      },
      {
          label: 'City',
          field: 'city',
          filterable: true
      },
      {
          label: 'State',
          field: 'state',
          filterable: true
      },
      {
          label: 'Zip',
          field: 'zip',
          filterable: true
      },
      {
          label: 'Email Timestamp',
          field: 'email_sent',
          filterable: true
      },
      {
          label: 'REMOVE',
          field: 'remove'
      },
      {
          label: 'EDIT',
          field: 'edit'
      },

    ],

  };
},
mounted(){
    this.loadItems()
},
methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },

    onPerPageChange(params) {
      console.log(params)
      this.updateParams({perPage: params.currentPerPage});
      this.loadItems();
    },

    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params.sortType,
          field: this.columns[params.columnIndex].field,
        }],
      });
      this.loadItems();
    },

    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },

    // load items is what brings back the rows from server
    loadItems() {

        var url = "http://localhost:5555/all_customers/"+this.serverParams.page+"/"+this.serverParams.perPage
        return axios.get(url).then(response => {
        this.totalRecords = response.totalRecords
         this.rows = response.data;
      });
    }
}

}
</script>
