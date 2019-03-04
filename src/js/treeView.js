(function ($) {
  "use strict";

  // Set these vars as you like
  const startClosed = true; // default = true

  $("ul.treeView > li").each(function () {
    if (this.classList.contains("folder")) {

      if($('.treeView .p_'+this.id).length === 0)
        $('.treeView #'+this.id).removeClass("folder").addClass("noKids");
      else {
        this.addEventListener("click", function () {
          toggleChilds(this.id, this.classList.contains("collapsed"));
          this.classList.toggle("collapsed");
        });
      }
    }

    toggleFolderArrows(this);
  });

  //hide all sub folders if start closed
  if (startClosed) {
    $("ul.treeView > li[data-depth!='1']").each(function () {
      hideElement(this);
    });

    //open parents if there is a selected item
    const item_id = getUrlParamValue('id');
    console.log(item_id);
    if (item_id !== 0) {
      toggleParents(item_id);
    }
  }

  function toggleFolderArrows(item) {
    //collapse/open base folders on start
    if (!startClosed || item.classList.contains("noKids")) {
      //Do nothing
    } else if (item.classList.contains("base")) {
      item.classList.toggle("collapsed");
    } else if(item.classList.contains("folder")) {
      item.classList.toggle("collapsed");
    }
  }

  function toggleParents(item_id) {
    const item = $('.treeView #'+item_id)[0];
    const parent_class = $.grep(item.className.split(" "), function (v,i) {
      return v.indexOf('p_') === 0;
    }).join();
    const parent_id = parent_class.replace('p_', '');

    if (parent_id !== '0') {
      $('.treeView .p_' + parent_id).each(function () {
        showElement(this);
      });
      toggleFolderArrows($('.treeView #' + parent_id)[0]);
      toggleParents(parent_id);
    }
  }

  function toggleChilds (parent_id, show) {
    $('.treeView .p_' + parent_id).each(function () {
      if (this.classList.contains("folder")) {
         toggleChilds(this.id,show && !this.classList.contains("collapsed"));
      }
      show ? showElement(this) : hideElement(this);
    });
  }

  function showElement(item) {
    $(item).show();
  }
  function hideElement(item) {
    $(item).hide();
  }

  function getUrlParamValue(name){
    const results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
      return 0;
    }
    else{
      return results[1] || 0;
    }
  }

})(jQuery);
