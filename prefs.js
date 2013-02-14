const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;


const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
    Convenience.initTranslations();
}

const CPUTemperaturePrefsWidget = new GObject.Class({
    Name: 'CPUTemperature.Prefs.Widget',
    GTypeName: 'CPUTemperaturePrefsWidget',
    Extends: Gtk.Grid,

    _init: function(params) {
        this.parent(params);
            // this.margin = this.row_spacing = this.column_spacing = 30;

        this._settings = Convenience.getSettings();
        this.attach(new Gtk.Label({ label: 'Seconds before next update' }), 0, 0, 1, 1);
        let update_time = Gtk.Scale.new_with_range(Gtk.Orientation.HORIZONTAL, 0, 100, 5);
            update_time.set_value(this._settings.get_int('update-time'));
            update_time.set_digits(0);
            update_time.set_hexpand(true);
            update_time.connect('value-changed', Lang.bind(this, this._onUpdateTimeChanged));
        this.attach(update_time, 1, 0, 1, 1);
        

		// this.attach(new Gtk.Label({ label: 'Unit' }), 0, 2, 1, 1);
  //       centigrade = new Gtk.RadioButton({ group: null, label: "Centigrade", valign: Gtk.Align.START });
  //       fahrenheit = new Gtk.RadioButton({ group: centigrade, label: "Fahrenheit", valign: Gtk.Align.START });
  //       // centigrade.connect('toggled', Lang.bind(this, this._onUnitChanged));
  //       this.attach(centigrade, 1, 2, 1, 1);
  //       this.attach(fahrenheit, 2, 2, 1, 1);



        // this._place3.set_active (true);
        this._update_time = update_time;
    },

    _onUpdateTimeChanged: function (update_time) {
        this._settings.set_int('update-time', this._update_time.get_value());
    },

	_onUnitChanged: function (unit) {
		// Main.notify('a', 'b');
    }

});

function buildPrefsWidget() {
    let widget = new CPUTemperaturePrefsWidget();
    widget.show_all();

    return widget;
}