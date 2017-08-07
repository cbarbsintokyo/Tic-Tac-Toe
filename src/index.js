import React from 'react';
import ReactDOM from 'react-dom';
import {
  createSelectable,
  SelectableGroup } from 'react-selectable-fast';
import './table.css';


const handleSelecting = selectingItems => {
  console.log('handleSelecting');
  // selectingItems.forEach((item, idx) => {
  //   const range = document.createRange();
  //   console.log('range', range);
  //   console.log('item', item.node);
  //   range.selectNode(item.node);
  //   console.log('range with node added', range, item);
  //   window.getSelection().addRange(range);
  // });

}

const handleSelectionClear = () => {
  console.log('handleSelectionClear');
  // CLEAR ALL SELECTIONS AND RANGES
}

const handleSelectionFinish = selectedItems => {
  console.log('handleSelectionFinish', selectedItems);
  //const selectedNode = selectedItems[0].node;
  //const selection = window.getSelection();
  const range = document.createRange();
  const table = document.getElementsByClassName('selectable-table')[0];
  console.log('table', table);
  const row = table.getElementsByClassName('selected')[0];
  const endrow = table.getElementsByClassName('selected')[`${selectedItems.length - 1}`];
  // const numSelectedItems = selectedItems.length;
  // const startRow = selectedItems[0];
  // const endNode = selectedItems[selectedItems.length];
  // selectedItems.forEach((item, idx) => {
  //   // selectedNodes.push(item.node);
  //   const range = document.createRange();
  //   const selection = window.getSelection();
  //   range.selectNode(item.node);
  //   selection.addRange(range);
  // });

  // TODO: CLEAR ALL RANGES AT setStart

  // console.log('selectedNodes', selectedNode);

  range.setStartBefore(row);
  range.setEndAfter(endrow);

  window.getSelection().addRange(range);

}


const TableRow = ({ selectableRef, selected, selecting }) => (
  <tr
    ref={selectableRef}
    className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
  >
    <td>Row</td>
    <td>Data</td>
  </tr>
);

const SelectableRow = createSelectable(TableRow);


const Table = () => (
  <div>
    <table className='border-table'>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
      </thead>
      <SelectableGroup
        className='selectable-table'
        clickClassName='selected'
        component='tbody'
        enableDeselect
        tolerance={0}
        allowClickWithoutSelected={false}
        duringSelection={handleSelecting}
        onSelectionClear={handleSelectionClear}
        onSelectionFinish={handleSelectionFinish}
      >
        <SelectableRow key={1} />
        <SelectableRow key={2} />
        <SelectableRow key={3} />
      </SelectableGroup>
    </table>
    <div id='selection' className='selection'>
    </div>
  </div>
);

// ========================================

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);
