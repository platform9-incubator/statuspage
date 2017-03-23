"use strict";

$(function () {
    console.log("Hello World!");
    var hostname = document.location.hostname;
    var shortname = document.location.hostname.split('.')[1];
    var port = ":9000";
    var baseStatusUrl = "http://" + hostname + port + "/" + shortname + '/status';

    var ServiceObject = Backbone.Model.extend({
        getStatus: function () {
            return $.get(baseStatusUrl + this.attributes.url)
        }
    });
    
    var ServicesCollection = Backbone.Collection.extend({
        model: function(attrs, options) {
            return new ServiceObject(attrs);
        },
        url: function () {
            return baseStatusUrl
        }
    });

    var ServicesListView = Backbone.View.extend({
        el: "#statusDiv",
        initialize: function () {
            var self = this;
            this.collection = new ServicesCollection;
            this.collection.fetch().then(function () {
                self.render()
            });
        },
        render: function () {
            var self = this;
            console.log("Rendering ServicesListView");
            console.log(this.collection);
            // console.log(this.collection.models);
            this.collection.each(function (data) {
                $.get(baseStatusUrl + data.attributes.url).then(function(innerData){
                    self.$el.append('<div class="service-container">' +
                        '<div class="service-name">' + data.attributes.name + '</div>' +
                        '<div class="service-status-' + innerData + '"</div></div>');
                });
            });
        }
    });
    var ServiceObjectView = Backbone.View.extend({
        render: function () {
            console.log("Rendering ServiceObjectView");
            var self = this;
            this.model.getStatus().then(function (data) {
                self.$el.append('<div class="service-container">' +
                    '<div class="service-name">' + self.model.attributes.name + '</div>' +
                    '<div class="service-status-' + data + '"</div></div>');
            });
            return this;
        }
    });
    var serviceListView = new ServicesListView();
});