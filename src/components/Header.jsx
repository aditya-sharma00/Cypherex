// Header.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis,faCircle } from '@fortawesome/free-solid-svg-icons';

const TaskBox = ({ taskId, taskContent }) => {
  return (
    <div className='task-box' >
      <span>{taskId}</span>
      <p>{taskContent}</p>
      <h6 className='task-box-1'><FontAwesomeIcon className='task-box-2' icon={faCircle} />Featured Request</h6>
    </div>
  );
};

const Header = ({ tickets, users, groupingOption, orderingOption }) => {
  const getHeaderTitle = (status) => {
    const statusTitles = {
      Backlog: 'Backlog',
      Todo: 'Todo',
      'In progress': 'In progress',
      Done: 'Done',
      Cancelled: 'Cancelled',
    };
    return statusTitles[status] || 'Unknown Status';
  };

  const getOrderedTickets = (tickets) => {
    switch (orderingOption) {
      case 'title':
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      case 'priority':
        return tickets.sort((a, b) => b.priority - a.priority);
      default:
        return tickets;
    }
  };

  if (groupingOption === 'user') {
    return (
      <div className = 'task-box-container'>
        {users.map((user) => {
          const filteredTickets = tickets.filter((task) => task.userId === user.id);
          const orderedTickets = getOrderedTickets(filteredTickets);
          const taskboxCount = orderedTickets.length;

          return (
            <div key={user.id} style={{ textAlign: 'center' }}>
              <span className='same-line'>{`${user.name} ${taskboxCount}`}<FontAwesomeIcon className='same-lines' icon={faPlus}  /><FontAwesomeIcon className='same_lines'  icon={faEllipsis} /></span>
              {taskboxCount > 0 ? (
                orderedTickets.map((task) => (
                  <TaskBox key={task.id} taskId={task.id} taskContent={task.title} />
                ))
              ) : (
                <div style={{ height: '60px' , width:'280px' }} /> 
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (groupingOption === 'status') {
    const uniqueStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

    return (
      <div className = 'task-box-container'>
        {uniqueStatuses.map((status) => {
          const filteredTickets = tickets.filter((task) => task.status === status);
          const orderedTickets = getOrderedTickets(filteredTickets);
          const taskboxCount = orderedTickets.length;

          return (
            <div key={status} style={{ textAlign: 'center' }}>
              <span className='same-line'>{`${getHeaderTitle(status)} ${taskboxCount}`} <FontAwesomeIcon className='same-lines' icon={faPlus}  /><FontAwesomeIcon className='same_lines'  icon={faEllipsis} /></span>
              {taskboxCount > 0 ? (
                orderedTickets.map((task) => (
                  <TaskBox key={task.id} taskId={task.id} taskContent={task.title} />
                ))
              ) : (
                <div style={{ height: '60px' , width:'280px' }} />
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (groupingOption === 'priority') {
    const priorityTitles = {
      '0': 'No priority',
      '1': 'Low',
      '2': 'Medium',
      '3': 'High',
      '4': 'Urgent',
    };

    return (
      <div className = 'task-box-container'>
        {Object.keys(priorityTitles).map((priority) => {
          const filteredTickets = tickets.filter((task) => task.priority.toString() === priority);
          const orderedTickets = getOrderedTickets(filteredTickets);
          const taskboxCount = orderedTickets.length;

          return (
            <div key={priority} style={{ textAlign: 'center' }}>
              <span className='same-line'>{`${priorityTitles[priority]} ${taskboxCount}`}<FontAwesomeIcon className='same-lines' icon={faPlus}  /><FontAwesomeIcon className='same_lines'  icon={faEllipsis} /></span>
              {taskboxCount > 0 ? (
                orderedTickets.map((task) => (
                  <TaskBox key={task.id} taskId={task.id} taskContent={task.title} />
                ))
              ) : (
                <div style={{ height: '60px', width:'280px' }} /> 
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    // Handle other cases or return an empty div if no valid groupingOption is provided
    return <div></div>;
  }
};

export default Header;
