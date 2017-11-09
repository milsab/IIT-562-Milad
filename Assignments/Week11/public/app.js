jQuery(document).ready(function($){
    var userid = 0;
    renderUserList();
    $('#btnAddUser').on('click', function(){
        console.log('Add User Clicked');
        renderUserForm();
    });

    $('#btnAddReminder').on('click', function(){
        console.log('Add Reminder Clicked');
        if(userid === 0){
            $('<p>').text('Please First Select a User From List of Users in The Left Side').dialog({
                resizable: false,
                height: "auto",
                width: 600,
                modal: true,
                title: 'Select User',
                buttons: {
                  OK: function() {
                    $( this ).dialog( "close" );
                  }
                }
            });
        } else{
            renderReminderForm();
        }
        
    });

    $('#btnDeleteReminder').on('click', function(){
        console.log('Delete All Reminder Clicked');
        if(userid === 0){
            $('<p>').text('Please First Select a User From List of Users in The Left Side').dialog({
                resizable: false,
                height: "auto",
                width: 600,
                modal: true,
                title: 'Select User',
                buttons: {
                  OK: function() {
                    $( this ).dialog( "close" );
                  }
                }
            });
        } else{
            $('<p>').text('Are you sure you want to delete All Reminders for the selected user?').dialog({
                resizable: false,
                height: "auto",
                width: 600,
                modal: true,
                title: 'Delete All Reminders',
                buttons: {
                  "Yes": function() {
                    $( this ).dialog( "close" );
                    $.ajax({
                        url: "/users/" + userid + "/reminders",
                        // dataType: "json",
                        type: 'DELETE',
                        success: function(result){
                            $('<p>').text('All reminders deleted successfully').dialog({
                                resizable: false,
                                height: "auto",
                                width: 500,
                                modal: true,
                                title: 'Deleted Successfully',
                                buttons: {
                                  ok: function() {
                                    $( this ).dialog( "close");
                                    renderReminderList();
                                  }
                                }
                            });
                            
                        },
                        error: function(err){
                            console.log(err);
                            alert('Delete Failed!' + err); 
                        }
                    });
                  },
                  Cancel: function() {
                    $( this ).dialog( "close" );
                  }
                }
            });
        }
    });

    $('#btnDelUser').on('click', function(){
        console.log('Delete User Clicked');
        if(userid === 0){
            $('<p>').text('Please First Select a User From List of Users in The Left Side').dialog({
                resizable: false,
                height: "auto",
                width: 600,
                modal: true,
                title: 'Select User',
                buttons: {
                  OK: function() {
                    $( this ).dialog( "close" );
                  }
                }
            });
        } else {
            $('<p>').text('Are you sure you want to delete the selected user?').dialog({
                resizable: false,
                height: "auto",
                width: 600,
                modal: true,
                title: 'Delete User',
                buttons: {
                  "Yes": function() {
                    $( this ).dialog( "close" );
                    $.ajax({
                        url: "/users/" + userid,
                        type: 'DELETE',
                        success: function(result){
                            $('<p>').text('Selected user deleted successfully').dialog({
                                resizable: false,
                                height: "auto",
                                width: 500,
                                modal: true,
                                title: 'Deleted Successfully',
                                buttons: {
                                  ok: function() {
                                    $( this ).dialog( "close");
                                    userid = 0;
                                    renderReminderList();
                                    renderUserList();
                                  }
                                }
                            });
                            
                        },
                        error: function(err){
                            console.log(err);
                            alert('Delete Failed!' + err); 
                        }
                    });
                  },
                  Cancel: function() {
                    $( this ).dialog( "close" );
                  }
                }
            });
        }
    });

    function renderUserForm(){
        $('#userForm').show();
        $('#userList').hide();
        
        var $editContainer = $('<div>');
        $editContainer.addClass('form-group');
        
        //Name TextBox
        var $lblTitle = $('<label>').text('Name:');
        var $txtName = $('<input>').addClass('form-control').attr({ id: 'txtName', type: 'text', placeholder: "Put user's name..."});
        $editContainer.append($lblTitle);
        $editContainer.append($txtName);

        //Email TextBox
        var $lblDesc = $('<label>').text('Email:');
        var $txtEmail = $('<input>').addClass('form-control input-lg').attr({ id: 'txtEmail', type: 'text', placeholder: "Put user's email..."});
        $editContainer.append($lblDesc);
        $editContainer.append($txtEmail);

        //Save Button
        var $btnSave = $('<button>').addClass('btn btn-success').text('Add Reminder');
        $btnSave.on('click', function(){
            var user = {};
            var users = [];
            user.name = $txtName.val();
            user.email = $txtEmail.val();
            users.push(user);
            $.ajax({
                url: '/users/',
                type: 'POST',
                data: JSON.stringify(users),
                contentType: 'application/json',
                success: function(result){
                    $('<p>').html('User added successfully.<br>User ID: ' + result.userID).dialog({
                        resizable: false,
                        height: "auto",
                        width: 500,
                        modal: true,
                        title: 'Saved',
                        buttons: {
                          OK: function() {
                            $( this ).dialog( "close" );
                          }
                        }
                    });
                    renderUserList();
                    $('#userList').show();
                    $('#userForm').hide();
                },
                error: function(err) { 
                    console.log(err);
                    alert('Failed!' + err); 
                } 
            });
        });
        $editContainer.append($btnSave);

        //Cancel Button
        var $btnCancel = $('<button>').addClass('btn btn-secondary').text('Cancel');
        $btnCancel.on('click', function(){
            $('#userList').show();
            $('#userForm').hide();
        });
        $editContainer.append($btnCancel);

        $('#userForm').empty();
        $('#userForm').append($editContainer);
    }
    
    function renderReminderForm(){
        $('#reminderForm').show();
        $('#reminderList').hide();
        
        var $editContainer = $('<div>');
        $editContainer.addClass('form-group');
        
        //Title TextBox
        var $lblTitle = $('<label>').text('Title:');
        var $txtTitle = $('<input>').addClass('form-control').attr({ id: 'txtTitle', type: 'text', placeholder: "Put reminder's title..."});
        $editContainer.append($lblTitle);
        $editContainer.append($txtTitle);

        //Description TextBox
        var $lblDesc = $('<label>').text('Description:');
        var $txtDescription = $('<input>').addClass('form-control input-lg').attr({ id: 'txtDescription', type: 'text', placeholder: "Put reminder's description..."});
        $editContainer.append($lblDesc);
        $editContainer.append($txtDescription);

        //Save Button
        var $btnSave = $('<button>').addClass('col-2 btn btn-success').text('Add Reminder');
        $btnSave.on('click', function(){
            var reminder = {};
            var reminders = [];
            reminder.title = $txtTitle.val();
            reminder.description = $txtDescription.val();
            reminders.push(reminder);
            $.ajax({
                url: '/users/' + userid + '/reminders',
                type: 'POST',
                data: JSON.stringify(reminders),
                contentType: 'application/json',
                success: function(result){
                    $('<p>').html('Reminder added successfully.<br>Reminder ID: ' + result.reminderID).dialog({
                        resizable: false,
                        height: "auto",
                        width: 500,
                        modal: true,
                        title: 'Saved',
                        buttons: {
                          OK: function() {
                            $( this ).dialog( "close" );
                          }
                        }
                    });
                    renderReminderList();
                    $('#reminderList').show();
                    $('#reminderForm').hide();
                },
                error: function(err) { 
                    console.log(err);
                    alert('Failed!' + err); 
                } 
            });
        });
        $editContainer.append($btnSave);

        //Cancel Button
        var $btnCancel = $('<button>').addClass('col-2 btn btn-secondary').text('Cancel');
        $btnCancel.on('click', function(){
            $('#reminderList').show();
            $('#reminderForm').hide();
        });
        $editContainer.append($btnCancel);

        $('#reminderForm').empty();
        $('#reminderForm').append($editContainer);
    }

    function renderUserList(){
        $.ajax({
            url: "/users",
            dataType: "json",
            type: 'GET',
            success: function(result){
                console.log('result: ' + result.name);
                $('#user-body').empty();
                result.forEach(function(r){
                    var $row = $('<tr>');
                    var $nameCell =  $('<a href="#" data-key="' + r.id + '">' + r.name + '</a>');
                    $nameCell.click(function(){
                        console.log(Number($(this).attr('data-key')));
                        $('#reminder-body').empty();
                        userid = Number($(this).attr('data-key'));
                        $('#userid').text('List of Reminders for User ID: ' + userid);
                        console.log('Before Ajax');
                        renderReminderList();
                    });
                    var $emailCell = $('<td>').append(r.email);
                    $row.append($nameCell);
                    $row.append($emailCell);
                    $('#user-body').append($row);
                });
            },
            error: function(err) { 
                console.log(err);
                if(err.status === 404){
                    //do nothing
                } else{
                    alert('Failed! ' + err.statusText);
                } 
            } 
        }); 
    }

    function renderReminderList(data){
        if(userid === 0){
            $('#reminder-body').empty();
            $('#userid').text('List of Reminders');
            return;
        }
        $('#reminder-body').empty();
        $.ajax({
            url: '/users/' + userid + '/reminders',
            dataType: 'json',
            type: 'GET',
            success: function(reminders){
                reminders.forEach(function(rem){
                    var $remRow = $('<tr>');
                    var $remId = $('<td>').append(rem.reminderid);
                    var $remTitle = $('<a href="#" data-key="' + rem.reminderid + '">' + rem.title + '</a>');
                    var $remDescription = $('<td>').append(rem.description);
                    var $remCreated = $('<td>').append(rem.created);
                    $remTitle.click(function(){
                        $('<p>').html('Are you sure you want to delete the following Reminder?<br><br>Reminder ID: ' + $remId.text() + '<br>Title: ' + $remTitle.text() + '<br>Description: ' + $remDescription.text()).dialog({
                            resizable: false,
                            height: "auto",
                            width: 600,
                            modal: true,
                            title: 'Delete Reminder?',
                            buttons: {
                              "Delete Reminder": function() {
                                $( this ).dialog( "close" );
                                $.ajax({
                                    url: '/users/' + userid + '/reminders/' + rem.reminderid,
                                    dataType: 'json',
                                    type: 'DELETE',
                                    success: function(delRem){
                                        $('<p>').text('The Reminder deleted successfully').dialog({
                                            resizable: false,
                                            height: "auto",
                                            width: 500,
                                            modal: true,
                                            title: 'Deleted Successfully',
                                            buttons: {
                                                ok: function() {
                                                    $( this ).dialog( "close" );
                                                    renderReminderList();
                                                }
                                            }
                                        });

                                    },
                                    error: function(err){
                                        console.log(err);
                                        alert('Delete Failed!' + err); 
                                    }
                                });
                              },
                              Cancel: function() {
                                $( this ).dialog( "close" );
                              }
                            }
                          });
                    });
                    
                    $remRow.append($remId);
                    $remRow.append($remTitle);
                    $remRow.append($remDescription);
                    $remRow.append($remCreated);
                    
                    $('#reminder-body').append($remRow);
                });
                
            },
            error: function(err){
                console.log(err);
                if(err.responseText === 'No reminder for this user'){
                    $('<p>').text('The selected user does not have any reminder yet').dialog({
                        resizable: false,
                        height: "auto",
                        width: 500,
                        modal: true,
                        title: 'No Reminder',
                        buttons: {
                            ok: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    });
                } else{
                    alert('Failed! ' + err.statusText);
                }
            }
        });
    }
});