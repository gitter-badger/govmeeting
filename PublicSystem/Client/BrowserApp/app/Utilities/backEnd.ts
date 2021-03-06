﻿/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

/**
 * <summary>
 *  This code belongs to the module for handling browsing a single meeting.
 * </summary>
**/
module Utilities {

    /**
     * <summary>
     *  Interface for back end.
     * </summary>
    **/
    export interface IBackEnd {
        meetingDataUrl: string;
        getMeetingInfo(meetingData: any): void;
        getTopicNames(meetingData: any): void;
        getSpeakerNames(meetingData: any): void;
        getTopicDiscussions(meetingData: any): void;
    }

    /**   
      * <summary>  
      *  Service to get data from the back end server.  
      *  We do not know which external function will be called first.
      *  Therefore, in each case, we call "getMeetingData()" to initiate
      *  the call to the backend for the meeting's data, if it hasn't already
      *  been done.
      * </summary>
     **/
    export class BackEndSrv implements IBackEnd {

        http: ng.IHttpService;
        meetingDataUrl: string;
        httpPromise: any;

        /**
         * <summary>
         *  BackEndSrv Constructor. 
         * </summary>
         * <param name="$http"> The $http service. </param>
        **/
        constructor($http: ng.IHttpService) {
            this.http = $http;
            this.meetingDataUrl = "testdata\\BBH-2014-09-08.json";
            this.httpPromise = null;
        }

        /**
         * <summary>
         *  Gets general meeting information for this meeting
         * </summary>
         * <param name="meetingData">
         *  An object pointer.
         *  We will add the meeting info onto this object. 
         * </param>
         */
        public getMeetingInfo(meetingData: any): any {
            this.getMeetingData();
            this.httpPromise.success(function (data: any) {
                meetingData.meetingInfo = data.meetingInfo;
            });
            return this.httpPromise;
        }

        /**
         * <summary>
         *  Gets topic names for this meeting
         * </summary>
         * <param name="meetingData">
         *  An object pointer.
         *  We will add the topicNames onto this object. 
         * </param>
        **/
        public getTopicNames(meetingData: any): void {
            this.getMeetingData();
            this.httpPromise.success(function (data: any) {
                meetingData.topicNames = data.topicNames;
            });
        }

        /**
         * <summary>
         *  Gets speaker names for this meeting
         * </summary>
         * <param name="meetingData">
         *  An object pointer.
         *  We will add the speakerNames onto this object. 
         * </param>
        **/
        public getSpeakerNames(meetingData: any): void {
            this.getMeetingData();
            this.httpPromise.success(function (data: any) {
                meetingData.speakerNames = data.speakerNames;
            });
        }

        /**
         * <summary>
         *  Gets topic discussions for this meeting
         * </summary>
         * <param name="meetingData">
         *  An object pointer.
         *  We will add the topicDiscussions onto this object. 
         * </param>
        **/
        public getTopicDiscussions(meetingData: any): void {
            this.getMeetingData();
            this.httpPromise.success(function (data: any) {
                meetingData.topicDiscussions = data.topicDiscussions;
            });
        }

        /**
         * <summary>
         *  Gets meeting data.
         *  Get the complete data for this meeting.
         * </summary>
        **/
        private getMeetingData(): void{
            if (this.httpPromise == null) {
                this.httpPromise = this.http.get(this.meetingDataUrl);
            };
        }
    }
}
 