"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var CacheConf=require('cache-conf');var moment=require('moment');var readPkg=require('read-pkg');var latestVersion=require('latest-version');var got=require('got');var Updater=function(){function Updater(){(0,_classCallCheck2.default)(this,Updater);this.cache=new CacheConf({configName:'updater',cwd:process.env.alfred_workflow_cache,version:process.env.alfred_workflow_version});}(0,_createClass2.default)(Updater,[{key:"checkPackal",value:function(){var _checkPackal=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee(interval){var bundleId,searchParam,pkgUrl,latest;return _regenerator.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:bundleId=process.env.alfred_workflow_bundleid;if(bundleId){_context.next=4;break;}console.error('No bundle ID, not checking Packal for updates.');return _context.abrupt("return");case 4:searchParam=encodeURIComponent('site:packal.org '+bundleId);pkgUrl=`https://encrypted.google.com/search?sourceid=chrome&ie=UTF-8&q=${searchParam}&btnI`;_context.next=8;return got(`https://github.com/packal/repository/blob/master/${bundleId}/appcast.xml`).catch(function(err){console.error(err);return false;}).then(function(response){var versionMatches=response.body.match(/<version>(.+)<\/version>/);if(versionMatches&&versionMatches.length>0){return{version:versionMatches[1],url:pkgUrl,checkedOnline:false};}return false;});case 8:latest=_context.sent;this.cache.set('latest_version_packal',latest,{maxAge:interval.as('milliseconds')});if(latest){latest.checkedOnline=true;}return _context.abrupt("return",latest);case 12:case"end":return _context.stop();}}},_callee,this);}));function checkPackal(_x){return _checkPackal.apply(this,arguments);}return checkPackal;}()},{key:"checkNpm",value:function(){var _checkNpm=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(interval){var pkg,url,latest,_args2=arguments;return _regenerator.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:pkg=_args2.length>1&&_args2[1]!==undefined?_args2[1]:null;_context2.t0=pkg;if(_context2.t0){_context2.next=6;break;}_context2.next=5;return readPkg(process.cwd());case 5:_context2.t0=_context2.sent;case 6:pkg=_context2.t0;url=`https://www.npmjs.com/package/${pkg.name}`;_context2.next=10;return latestVersion(pkg.name).catch(function(err){console.error(err);return false;}).then(function(version){return{version:version,url:url,checkedOnline:false};});case 10:latest=_context2.sent;this.cache.set('latest_version_npm',latest,{maxAge:interval.as('milliseconds')});if(latest){latest.checkedOnline=true;}return _context2.abrupt("return",latest);case 14:case"end":return _context2.stop();}}},_callee2,this);}));function checkNpm(_x2){return _checkNpm.apply(this,arguments);}return checkNpm;}()},{key:"checkUpdates",value:function(){var _checkUpdates=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(source,interval){var pkg,latest,_args3=arguments;return _regenerator.default.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:pkg=_args3.length>2&&_args3[2]!==undefined?_args3[2]:null;latest=this.cache.get(`latest_version_${source}`);if(!(latest===false)){_context3.next=4;break;}return _context3.abrupt("return");case 4:if(latest){_context3.next=11;break;}_context3.t0=source.toLowerCase();_context3.next=_context3.t0==='npm'?8:_context3.t0==='packal'?9:10;break;case 8:return _context3.abrupt("return",this.checkNpm(interval,pkg));case 9:return _context3.abrupt("return",this.checkPackal(interval));case 10:return _context3.abrupt("return");case 11:latest.checkedOnline=false;return _context3.abrupt("return",latest);case 13:case"end":return _context3.stop();}}},_callee3,this);}));function checkUpdates(_x3,_x4){return _checkUpdates.apply(this,arguments);}return checkUpdates;}()}]);return Updater;}();module.exports=new Updater();
//# sourceMappingURL=updater.js.map