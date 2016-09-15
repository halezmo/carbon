import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import I18n from 'i18n-js';
import DateRange from './date-range';
import Date from './../date';
import DateRangeValidator from './../../utils/validations/date-range';

describe('DateRange', () => {
  let instance, customOnChange;

  beforeAll(() => {
    customOnChange = jasmine.createSpy();

    instance = TestUtils.renderIntoDocument(
      <DateRange onChange={ customOnChange } value={ ['2016-10-10','2016-11-11'] } />
    );

    spyOn(instance._startDate, '_handleContentChange');
    spyOn(instance._startDate, '_handleBlur');

    spyOn(instance._endDate, '_handleContentChange');
    spyOn(instance._endDate, '_handleBlur');
  });

  describe('_onChange', () => {
    describe('when the start date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('startDate', { target: { value: '2016-10-15' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-15', '2016-11-11']);
      });

      it('triggers a content change in the endDate field', () => {
        instance._onChange('startDate', { target: { value: '2016-10-15' } });
        expect(instance._endDate._handleContentChange).toHaveBeenCalled();
      });
    });

    describe('when the end date changes', () => {
      it('calls the passed in onChange function', () => {
        instance._onChange('endDate', { target: { value: '2016-11-16' } });
        expect(customOnChange).toHaveBeenCalledWith(['2016-10-10', '2016-11-16']);
      });

      it('triggers a content change in the endDate field', () => {
        instance._onChange('endDate', { target: { value: '2016-11-16' } });
        expect(instance._startDate._handleContentChange).toHaveBeenCalled();
      });
    });

    it('calls handleBlur on both date fields', () => {
      instance._onChange('startDate', { target: { value: '2016-10-15' } });
      expect(instance._startDate._handleBlur).toHaveBeenCalled();
      expect(instance._endDate._handleBlur).toHaveBeenCalled();
    });
  });

  describe('startDate getter', () => {
    it('returns the start date', () => {
      expect(instance.startDate).toEqual('2016-10-10');
    });
  });

  describe('endDate getter', () => {
    it('returns the end date', () => {
      expect(instance.endDate).toEqual('2016-11-11');
    });
  });

  describe('startMessage getter', () => {
    it('returns a default message', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              date_range: 'start date cannot be earlier than end date'
            }
          }
        }
      };

      expect(instance.startMessage).toEqual(I18n.t('errors.messages.date_range'));
    });

    describe('when a custom message is provided', () => {
      it('returns the custom message', () => {
        let customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
            startMessage="That's in the past, live for the future"
          />
        );
        expect(customInstance.startMessage).toEqual("That's in the past, live for the future");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        let noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
          />
        );
        expect(noMessageInstance.startMessage).toEqual('Start date must not be later than the end date');
      });
    });
  });

  describe('endMessage getter', () => {
    it('returns a default message', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              date_range: 'start date cannot be earlier than end date'
            }
          }
        }
      };

      expect(instance.endMessage).toEqual(I18n.t('errors.messages.date_range'));
    });

    describe('when a custom message is provided', () => {
      it('returns the custom message', () => {
        let customInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
            endMessage="That's in the future, live in the present"
          />
        );
        expect(customInstance.endMessage).toEqual("That's in the future, live in the present");
      });
    });

    describe('when no translation is available and no custom message was passed', () => {
      it('returns a default english sentence', () => {
        I18n.translations = {};

        let noMessageInstance = TestUtils.renderIntoDocument(
          <DateRange
            onChange={ customOnChange }
            value={ ['2016-10-10','2016-11-11'] }
          />
        );
        expect(noMessageInstance.endMessage).toEqual('End date cannot be earlier than the start date');
      });
    });
  });

  describe('focusStart', () => {
    it('closes the other datepicker', () => {
      spyOn( instance._endDate, 'closeDatePicker');
      instance.focusStart();
      expect(instance._endDate.closeDatePicker).toHaveBeenCalled();
    });
  });

  describe('endDate', () => {
    it('closes the other datepicker', () => {
      spyOn( instance._startDate, 'closeDatePicker');
      instance.focusEnd();
      expect(instance._startDate.closeDatePicker).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    let dates;

    beforeAll(() => {
      dates = TestUtils.scryRenderedComponentsWithType(instance, Date);
    });

    it('renders 2 date components', () => {
      expect(dates.length).toEqual(2);
    });

    it('renders optional labels inline', () => {
      let labelInstance = TestUtils.renderIntoDocument(
        <DateRange
          onChange={ customOnChange }
          value={ ['2016-10-10','2016-11-11'] }
          startLabel='From'
          endLabel='To'
        />
      );
      dates = TestUtils.scryRenderedComponentsWithType(labelInstance, Date);
      expect(dates[0].props.label).toEqual('From');
      expect(dates[1].props.label).toEqual('To');
    });

    it('renders a DateRangeValidator with each Date component', () => {
      expect(dates[0].props.validations[0]).toEqual(jasmine.any(DateRangeValidator));
      expect(dates[1].props.validations[0]).toEqual(jasmine.any(DateRangeValidator));
    });
  });
});