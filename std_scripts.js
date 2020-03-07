function customAlert(headingText='Alert', 
                        msg='',
                        alertClass='alert-primary',
                        alertid = 'myAlert',
                        alertParent='#myalerts')
                        {

    var divelement=$('<div>');
    var classText='alert ' + alertClass;
    divelement.attr('class',classText);
    divelement.attr('role','alert');
    divelement.attr('id',alertid);
    $(alertParent).append(divelement);

    var alertHeading=$('<h4>');
    alertHeading.attr('class','alert-heading');
    alertHeading.attr('text',headingText);
    divelement.append(alertHeading);

    var alertMsg=$('<p>');
    alertMsg.attr('class','alert-message mb-0');
    alertMsg.attr('text',msg)
    divelement.append(alertMsg);

    var alertBtn=$('<button>');
    alertBtn.attr('type','button');
    alertBtn.attr('class','close');
    alertBtn.attr('data-dismiss','alert');
    alertBtn.attr('aria-label','close');
    alertBtn.attr('innerHTML','<span aria-hidden="true">&times;</span>');
    divelement.append(alertBtn);

};

$('.alert').alert();
