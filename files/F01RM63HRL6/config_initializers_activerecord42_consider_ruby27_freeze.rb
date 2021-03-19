require 'active_record/connection_adapters/abstract/schema_dumper'

module ActiveRecord
  module ConnectionAdapters
    module ColumnDumper
      def column_spec(column, types)
        spec = prepare_column_options(column, types)
        (spec.keys - [:name, :type]).each{ |k| spec[k] = "#{k}: #{spec[k]}" }
        spec
      end
    end
  end
end